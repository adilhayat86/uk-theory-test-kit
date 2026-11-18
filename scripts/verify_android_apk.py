#!/usr/bin/env python3
"""Verify the actual offline Android APK, not only its export or hidden menus.

CI installs scripts/android-verify-requirements.txt for pixel comparisons.
No signing credentials are read or printed by this verifier.
"""
import argparse
from dataclasses import dataclass, field
import hashlib
import io
import json
import os
from pathlib import Path
import re
import shutil
import struct
import subprocess
import zipfile

TEST_CERTIFICATE = "fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c"
BACKUP_DOMAINS = {
    "root", "file", "database", "sharedpref", "external",
    "device_root", "device_file", "device_database", "device_sharedpref",
}
ALLOWED_ANDROID_PERMISSIONS = {
    "android.permission.INTERNET", "android.permission.ACCESS_NETWORK_STATE",
    "android.permission.WAKE_LOCK",
}
GALLERY_LABELS = ("Search my images", "Previous image", "Next image")


@dataclass
class XmlNode:
    name: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)


def require(condition, message):
    if not condition:
        raise ValueError(message)


def run(command, cwd=None):
    result = subprocess.run([str(value) for value in command], cwd=cwd,
                            capture_output=True, text=True, encoding="utf-8", errors="replace")
    require(result.returncode == 0,
            "Android verification command failed: " + str(command[0]) + "\n" +
            (result.stderr or result.stdout)[-3000:])
    return result.stdout


def parse_xmltree(output):
    """Read aapt2's decoded binary XML tree, retaining parent/child structure."""
    roots, stack = [], []
    for line in output.splitlines():
        element = re.match(r"^(\s*)E:\s+([^\s(]+)", line)
        if element:
            indent, name = len(element[1]), element[2]
            while stack and stack[-1][0] >= indent:
                stack.pop()
            node = XmlNode(name)
            (stack[-1][1].children if stack else roots).append(node)
            stack.append((indent, node))
            continue
        attr = re.match(r"^\s*A:\s+([^\s(=]+)(?:\([^)]*\))?=(.*)$", line)
        if attr and stack:
            name = attr[1].rsplit(":", 1)[-1]
            value = attr[2].strip()
            quoted = re.match(r'^("(?:[^"\\]|\\.)*")', value)
            if quoted:
                value = json.loads(quoted[1])
            stack[-1][1].attrs[name] = value
    require(len(roots) == 1, "Expected one root in decoded Android XML")
    return roots[0]


def false_value(value):
    return value == "false" or bool(re.fullmatch(r"(?:\(type 0x12\))?0x0+", value or ""))


def verify_manifest(manifest, permissions_output, app_config, release_config):
    require(manifest.name == "manifest", "Android manifest root is missing")
    applications = [node for node in manifest.children if node.name == "application"]
    require(len(applications) == 1, "Expected exactly one Android application")
    app = applications[0]
    require(false_value(app.attrs.get("allowBackup")), "Android cloud backup must be explicitly disabled")
    require(false_value(app.attrs.get("fullBackupContent")), "Legacy Android backup must be disabled")
    require(app.attrs.get("dataExtractionRules", "").startswith("@"),
            "Missing Android cloud/device-transfer exclusion resource")
    for attribute in ("debuggable", "testOnly", "usesCleartextTraffic"):
        require(attribute not in app.attrs or false_value(app.attrs[attribute]),
                "Release APK must not enable " + attribute)
    permissions = set(re.findall(r"uses-permission:\s+name='([^']+)'", permissions_output))
    own_receiver = app_config["android"]["package"] + ".DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION"
    unexpected = permissions - ALLOWED_ANDROID_PERMISSIONS - {own_receiver}
    require(not unexpected, "Unnecessary Android permissions: " + ", ".join(sorted(unexpected)))
    require("android.permission.WAKE_LOCK" in permissions,
            "Video playback wake-lock permission unexpectedly disappeared; inspect native behavior")
    return app, sorted(permissions)


def extraction_resource(resources, reference):
    match = re.search(r"resource\s+(0x[0-9a-fA-F]+)\s+xml/android_mvp_data_extraction_rules\b", resources)
    require(match is not None, "Compiled local-data exclusion resource is missing")
    require(reference.lower() == "@" + match[1].lower(),
            "Application does not reference the verified local-data exclusion rules")
    remainder = re.split(r"(?m)^\s*resource\s+0x", resources[match.end():], maxsplit=1)[0]
    filename = re.search(r"\(file\)\s+(\S+\.xml)\b", remainder)
    require(filename is not None, "Cannot locate compiled local-data exclusion XML")
    return filename[1]


def verify_extraction_rules(tree):
    require(tree.name == "data-extraction-rules", "Invalid Android extraction-rule root")
    for mode in ("cloud-backup", "device-transfer"):
        sections = [node for node in tree.children if node.name == mode]
        require(len(sections) == 1, "Missing or repeated Android " + mode + " rules")
        nodes = sections[0].children
        require(all(node.name == "exclude" for node in nodes),
                "Only exclusions are allowed in local-only " + mode + " rules")
        require(all(node.attrs.get("path") == "." for node in nodes),
                "Every local-only exclusion must cover its entire storage domain")
        domains = [node.attrs.get("domain") for node in nodes]
        require(len(domains) == len(BACKUP_DOMAINS) and set(domains) == BACKUP_DOMAINS,
                "Android " + mode + " does not exclude every app storage domain")


def verify_badging(output, app_config, release_config):
    package = re.search(r"^package: name='([^']+)' versionCode='([^']+)' versionName='([^']+)'", output, re.M)
    require(package is not None, "Cannot read APK identity")
    expected = (app_config["android"]["package"], str(app_config["android"]["versionCode"]), app_config["version"])
    require(package.groups() == expected, "APK package/version differs from source app.json")
    minimum = re.search(r"^sdkVersion:'(\d+)'", output, re.M)
    target = re.search(r"^targetSdkVersion:'(\d+)'", output, re.M)
    require(minimum is not None and target is not None, "Cannot read Android SDK requirements")
    require(int(minimum[1]) == release_config["minimumAndroidApi"],
            "Minimum Android API changed; reconcile supported-device promises")
    require(int(target[1]) >= release_config["minimumTargetApi"], "Target API is below the release policy minimum")
    return {"package": package[1], "version_code": int(package[2]), "version": package[3],
            "min_sdk": int(minimum[1]), "target_sdk": int(target[1])}


def load_segment_alignments(data):
    require(data[:4] == b"\x7fELF" and len(data) >= 64 and data[4:6] == b"\x02\x01",
            "Expected a little-endian 64-bit ELF library")
    offset = struct.unpack_from("<Q", data, 32)[0]
    entry_size, count = struct.unpack_from("<HH", data, 54)
    require(entry_size >= 56 and count <= 1000 and offset + entry_size * count <= len(data),
            "Invalid ELF program-header table")
    loads = []
    for index in range(count):
        values = struct.unpack_from("<IIQQQQQQ", data, offset + index * entry_size)
        if values[0] == 1:
            alignment = values[7]
            require(alignment >= 16384 and alignment & (alignment - 1) == 0,
                    "Native PT_LOAD segment does not support 16 KB pages")
            require(values[2] % 16384 == values[3] % 16384,
                    "Native PT_LOAD offset/address are not 16 KB congruent")
            loads.append(alignment)
    require(bool(loads), "Native ELF library has no PT_LOAD segment")
    return loads


def verify_native_libraries(apk):
    libraries = []
    architectures = set()
    for item in apk.infolist():
        if re.match(r"^lib/(arm64-v8a|x86_64)/.+\.so$", item.filename):
            require(item.compress_type == zipfile.ZIP_STORED,
                    "64-bit native library is unexpectedly compressed: " + item.filename)
            alignments = load_segment_alignments(apk.read(item))
            libraries.append({"path": item.filename, "minimum_load_alignment": min(alignments)})
            architectures.add(item.filename.split("/")[1])
    require("arm64-v8a" in architectures, "APK has no arm64-v8a native libraries")
    return libraries


def pixel_hash(data):
    from PIL import Image
    with Image.open(io.BytesIO(data)) as image:
        rgba = image.convert("RGBA")
        # AAPT can normalize invisible RGB values while preserving the displayed image.
        rgba = Image.alpha_composite(Image.new("RGBA", rgba.size), rgba)
        return hashlib.sha256(struct.pack("<II", *rgba.size) + rgba.tobytes()).hexdigest()


def bundled_string(bundle, value):
    return value.encode("utf-8") in bundle or value.encode("utf-16le") in bundle


def verify_assets(apk, root, mode):
    bundle = apk.read("assets/index.android.bundle")
    require(len(bundle) > 0, "Offline JavaScript bundle is empty")
    for label in GALLERY_LABELS:
        require(bundled_string(bundle, label) == (mode == "review"),
                "Artwork gallery dependency separation failed for " + label)

    pack = root / "src/assets/illustrations-v2"
    manifest = json.loads((pack / "image-manifest.json").read_text(encoding="utf-8"))
    selected = set(json.loads((pack / "learner-selection.json").read_text(encoding="utf-8"))["assetIds"])
    require(selected <= {item["id"] for item in manifest["assets"]}, "Unknown selected illustration ID")
    png_hashes = {pixel_hash(apk.read(item)) for item in apk.namelist() if item.lower().endswith(".png")}
    included, excluded = [], []
    for asset in manifest["assets"]:
        present = pixel_hash((pack / asset["file"]).read_bytes()) in png_hashes
        expected = mode == "review" or asset["id"] in selected
        require(present == expected,
                ("Missing offline image: " if expected else "Unselected draft leaked into APK: ") + asset["id"])
        (included if expected else excluded).append(asset["id"])

    source_images = set()
    for registry in ("illustrationAssets.ts", "dftSignAssets.ts", "teachingImages.ts", "studyImages.ts", "brandAssets.ts"):
        filename = root / "src/data" / registry
        for relative in re.findall(r"require\(['\"]([^'\"]+\.png)['\"]\)", filename.read_text(encoding="utf-8")):
            image = (filename.parent / relative).resolve()
            require(pixel_hash(image.read_bytes()) in png_hashes, "Missing learner/brand image: " + relative)
            source_images.add(str(image))

    registry = root / "src/data/caseStudies.ts"
    source_videos = [(registry.parent / relative).resolve()
                     for relative in re.findall(r"require\(['\"]([^'\"]+\.mp4)['\"]\)",
                                                registry.read_text(encoding="utf-8"))]
    require(len(source_videos) >= 3 and len(set(source_videos)) == len(source_videos),
            "At least three distinct source videos must be registered")
    source_hashes = {hashlib.sha256(path.read_bytes()).hexdigest() for path in source_videos}
    packaged_videos = [name for name in apk.namelist() if name.lower().endswith(".mp4")]
    video_hashes = set()
    for name in packaged_videos:
        data = apk.read(name)
        require(len(data) > 1024 and data[4:8] == b"ftyp", "Invalid packaged video: " + name)
        video_hashes.add(hashlib.sha256(data).hexdigest())
    require(video_hashes == source_hashes and len(packaged_videos) == len(source_videos),
            "Packaged videos differ from the registered offline originals")

    identities = json.loads(run(["node", "-e",
        "const {buildCatalogue}=require('./scripts/review-content.cjs');const c=buildCatalogue();"
        "process.stdout.write(JSON.stringify({question:c.entries.filter(e=>e.kind==='question').map(e=>e.id),"
        "lesson:c.entries.filter(e=>e.kind==='lesson').map(e=>e.id)}));"], cwd=root))
    require(all(bundled_string(bundle, question_id) for question_id in identities["question"]),
            "A source question ID is missing from the offline bundle")
    require(all(bundled_string(bundle, lesson_id) for lesson_id in identities["lesson"]),
            "A source lesson ID is missing from the offline bundle")
    return {"offline_bundle_bytes": len(bundle), "verified_question_ids": len(identities["question"]),
            "verified_lesson_ids": len(identities["lesson"]),
            "project_images_present": len(included), "unselected_drafts_excluded": len(excluded),
            "required_registry_images_verified": len(source_images),
            "offline_videos_verified": len(source_videos), "gallery_included": mode == "review"}


def certificate_digests(output):
    return sorted(set(re.findall(r"certificate SHA-256 digest:\s*([0-9a-fA-F]{64})", output)))


def verify_signer(output, signing, release_config):
    digests = [value.lower() for value in certificate_digests(output)]
    require(bool(digests), "APK has no verified signing certificate")
    if signing == "test":
        require(digests == [TEST_CERTIFICATE], "Internal APK no longer matches the Samsung test certificate")
    else:
        expected = release_config.get("uploadCertificateSha256")
        require(isinstance(expected, str) and re.fullmatch(r"[0-9a-fA-F]{64}", expected),
                "Production upload certificate is not recorded in release/android-release.json")
        require(TEST_CERTIFICATE not in digests and expected.lower() in digests,
                "Production artifact uses a test or unexpected certificate")
    return digests


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("apk", type=Path)
    parser.add_argument("--mode", choices=("learner", "review"), default="learner")
    parser.add_argument("--signing", choices=("test", "production"), default="test")
    parser.add_argument("--sdk", type=Path)
    parser.add_argument("--build-tools", default="37.0.0")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    app_config = json.loads((root / "app.json").read_text(encoding="utf-8"))["expo"]
    release_config = json.loads((root / "release/android-release.json").read_text(encoding="utf-8"))
    sdk = args.sdk or Path(os.environ.get("ANDROID_HOME") or os.environ.get("ANDROID_SDK_ROOT") or "")
    tools_dir = sdk / "build-tools" / args.build_tools
    executable = ".exe" if os.name == "nt" else ""
    aapt = tools_dir / ("aapt2" + executable)
    zipalign = tools_dir / ("zipalign" + executable)
    apksigner = tools_dir / "lib/apksigner.jar"
    require(all(path.is_file() for path in (aapt, zipalign, apksigner)), "Android build tools are unavailable")
    java = shutil.which("java")
    require(java is not None, "Java is required to verify the APK signature")
    identity = verify_badging(run([aapt, "dump", "badging", args.apk]), app_config, release_config)
    manifest = parse_xmltree(run([aapt, "dump", "xmltree", "--file", "AndroidManifest.xml", args.apk]))
    app, permissions = verify_manifest(manifest, run([aapt, "dump", "permissions", args.apk]),
                                       app_config, release_config)
    filename = extraction_resource(run([aapt, "dump", "resources", args.apk]), app.attrs["dataExtractionRules"])
    verify_extraction_rules(parse_xmltree(run([aapt, "dump", "xmltree", "--file", filename, args.apk])))
    certificates = verify_signer(run([java, "-jar", apksigner, "verify", "--print-certs", args.apk]),
                                  args.signing, release_config)
    with zipfile.ZipFile(args.apk) as apk:
        require(apk.testzip() is None, "APK ZIP integrity check failed")
        libraries = verify_native_libraries(apk)
        assets = verify_assets(apk, root, args.mode)
    run([zipalign, "-c", "-P", "16", "-v", "4", args.apk])
    report = {**identity, "mode": args.mode, "signing": args.signing,
              "apk_sha256": hashlib.sha256(args.apk.read_bytes()).hexdigest(),
              "apk_size_bytes": args.apk.stat().st_size,
              "certificate_sha256": certificates, "permissions": permissions,
              "backup_disabled": True, "cloud_and_device_transfer_excluded": True,
              "elf_16kb_libraries": len(libraries), "zipalign_16kb_passed": True,
              **assets, "source_commit": os.environ.get("GITHUB_SHA")}
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
