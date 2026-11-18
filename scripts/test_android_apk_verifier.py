import copy
from pathlib import Path
import struct
import unittest
from verify_android_apk import (
    XmlNode, parse_xmltree, verify_manifest, verify_extraction_rules,
    extraction_resource, verify_badging, load_segment_alignments,
    verify_signer, TEST_CERTIFICATE, BACKUP_DOMAINS,
)

APP = {"version": "0.8.0", "android": {"package": "com.example.theory", "versionCode": 11}}
RELEASE = {"minimumAndroidApi": 24, "minimumTargetApi": 36, "uploadCertificateSha256": None}


def manifest():
    return XmlNode("manifest", children=[XmlNode("application", attrs={
        "allowBackup": "false", "fullBackupContent": "false",
        "dataExtractionRules": "@0x7f150001",
    }, children=[XmlNode("activity", attrs={"name": ".MainActivity"})])])


def extraction():
    return XmlNode("data-extraction-rules", children=[
        XmlNode(mode, children=[XmlNode("exclude", attrs={"domain": domain, "path": "."})
                               for domain in sorted(BACKUP_DOMAINS)])
        for mode in ("cloud-backup", "device-transfer")
    ])


def elf(alignment=16384, offset=0):
    data = bytearray(120)
    data[:6] = b"\x7fELF\x02\x01"
    struct.pack_into("<Q", data, 32, 64)
    struct.pack_into("<HH", data, 54, 56, 1)
    struct.pack_into("<IIQQQQQQ", data, 64, 1, 5, offset, 0, 0, 120, 120, alignment)
    return bytes(data)


class ManifestTests(unittest.TestCase):
    def test_binary_xml_tree_keeps_activity_and_application_attributes_separate(self):
        tree = parse_xmltree('''N: android=http://schemas.android.com/apk/res/android
  E: manifest (line=2)
    A: package="com.example.theory" (Raw: "com.example.theory")
    E: application (line=3)
      A: http://schemas.android.com/apk/res/android:allowBackup(0x01010280)=false
      A: http://schemas.android.com/apk/res/android:fullBackupContent(0x010104eb)=(type 0x12)0x0
      A: http://schemas.android.com/apk/res/android:dataExtractionRules(0x0101063e)=@0x7f150001
      E: activity (line=4)
        A: http://schemas.android.com/apk/res/android:name(0x01010003)=".MainActivity"
''')
        app, permissions = verify_manifest(tree, "uses-permission: name='android.permission.WAKE_LOCK'", APP, RELEASE)
        self.assertEqual(app.children[0].attrs["name"], ".MainActivity")
        self.assertEqual(permissions, ["android.permission.WAKE_LOCK"])

    def test_unneeded_storage_and_overlay_permissions_fail(self):
        for permission in ("READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE", "SYSTEM_ALERT_WINDOW", "VIBRATE"):
            with self.subTest(permission=permission), self.assertRaisesRegex(ValueError, "Unnecessary Android permissions"):
                verify_manifest(manifest(), "uses-permission: name='android.permission.WAKE_LOCK'\n"
                                "uses-permission: name='android.permission." + permission + "'", APP, RELEASE)

    def test_backup_or_debug_flags_cannot_be_enabled(self):
        for flag in ("allowBackup", "fullBackupContent", "debuggable", "testOnly", "usesCleartextTraffic"):
            tree = manifest()
            tree.children[0].attrs[flag] = "true"
            with self.subTest(flag=flag), self.assertRaises(ValueError):
                verify_manifest(tree, "uses-permission: name='android.permission.WAKE_LOCK'", APP, RELEASE)

    def test_missing_legacy_backup_opt_out_fails(self):
        tree = manifest()
        del tree.children[0].attrs["fullBackupContent"]
        with self.assertRaisesRegex(ValueError, "Legacy Android backup"):
            verify_manifest(tree, "uses-permission: name='android.permission.WAKE_LOCK'", APP, RELEASE)

    def test_real_build_tools_37_badging_verifies_api_values_before_rejecting_wrong_target(self):
        output = (Path(__file__).parent / "fixtures/aapt2-37-badging.txt").read_text(encoding="utf-8")
        fixture_app = {"version": "0.7.0", "android": {"package": "com.adilhayat.uktheorytestkit", "versionCode": 10}}
        result = verify_badging(output, fixture_app, RELEASE)
        self.assertEqual((result["min_sdk"], result["target_sdk"]), (24, 36))
        with self.assertRaisesRegex(ValueError, "Target API is below"):
            verify_badging(output.replace("targetSdkVersion:'36'", "targetSdkVersion:'35'"), fixture_app, RELEASE)
        with self.assertRaisesRegex(ValueError, "Minimum Android API changed"):
            verify_badging(output.replace("minSdkVersion:'24'", "minSdkVersion:'25'"), fixture_app, RELEASE)

    def test_legacy_badging_format_and_identity_checks_remain_supported(self):
        output = ("package: name='com.example.theory' versionCode='11' versionName='0.8.0'\n"
                  "sdkVersion:'24'\ntargetSdkVersion:'36'\n")
        self.assertEqual(verify_badging(output, APP, RELEASE)["target_sdk"], 36)
        with self.assertRaisesRegex(ValueError, "Target API"):
            verify_badging(output.replace("targetSdkVersion:'36'", "targetSdkVersion:'35'"), APP, RELEASE)
        with self.assertRaisesRegex(ValueError, "package/version"):
            verify_badging(output.replace("versionCode='11'", "versionCode='10'"), APP, RELEASE)

    def test_minimum_sdk_aliases_must_agree(self):
        output = ("package: name='com.example.theory' versionCode='11' versionName='0.8.0'\n"
                  "minSdkVersion:'24'\nsdkVersion:'24'\ntargetSdkVersion:'36'\n")
        self.assertEqual(verify_badging(output, APP, RELEASE)["min_sdk"], 24)
        with self.assertRaisesRegex(ValueError, "Conflicting Android minimum SDK"):
            verify_badging(output.replace("sdkVersion:'24'", "sdkVersion:'25'"), APP, RELEASE)
        with self.assertRaisesRegex(ValueError, "Conflicting Android target SDK"):
            verify_badging(output + "targetSdkVersion:'35'\n", APP, RELEASE)

    def test_malformed_sdk_value_cannot_hide_behind_a_valid_alias(self):
        output = ("package: name='com.example.theory' versionCode='11' versionName='0.8.0'\n"
                  "minSdkVersion:'unknown'\nsdkVersion:'24'\ntargetSdkVersion:'36'\n")
        with self.assertRaisesRegex(ValueError, "Cannot read Android minimum SDK"):
            verify_badging(output, APP, RELEASE)


class BackupRuleTests(unittest.TestCase):
    def test_real_sdk37_compiled_and_path_shortened_local_data_fixture(self):
        fixtures = Path(__file__).parent / "fixtures"
        read = lambda part: (fixtures / ("aapt2-37-local-data-" + part + ".txt")).read_text(encoding="utf-8")
        identity = verify_badging(read("badging"), APP, RELEASE)
        self.assertEqual((identity["min_sdk"], identity["target_sdk"]), (24, 36))
        app, permissions = verify_manifest(parse_xmltree(read("manifest")), read("permissions"), APP, RELEASE)
        self.assertEqual(permissions, ["android.permission.WAKE_LOCK"])
        rule_file = extraction_resource(read("resources"), app.attrs["dataExtractionRules"])
        self.assertTrue(rule_file.startswith("res/") and rule_file.endswith(".xml"))
        self.assertNotIn("android_mvp_data_extraction_rules", rule_file)
        verify_extraction_rules(parse_xmltree(read("rules")))

    def test_all_local_storage_is_excluded_in_both_modes(self):
        verify_extraction_rules(extraction())

    def test_one_missing_database_exclusion_is_a_failure(self):
        tree = extraction()
        tree.children[1].children = [node for node in tree.children[1].children if node.attrs["domain"] != "database"]
        with self.assertRaisesRegex(ValueError, "every app storage domain"):
            verify_extraction_rules(tree)

    def test_partial_paths_and_includes_are_not_an_opt_out(self):
        for mutation in ("path", "include"):
            tree = extraction()
            node = tree.children[0].children[0]
            if mutation == "path":
                node.attrs["path"] = "only-one-file"
            else:
                node.name = "include"
            with self.subTest(mutation=mutation), self.assertRaises(ValueError):
                verify_extraction_rules(tree)

    def test_an_unused_policy_resource_cannot_pass(self):
        dump = ("resource 0x7f150001 xml/android_mvp_data_extraction_rules\n"
                "  () (file) res/Q7.xml type=XML\n"
                "resource 0x7f150002 xml/other\n  () (file) res/Q8.xml type=XML\n")
        self.assertEqual(extraction_resource(dump, "@0x7f150001"), "res/Q7.xml")
        with self.assertRaisesRegex(ValueError, "does not reference"):
            extraction_resource(dump, "@0x7f150002")


class NativePageTests(unittest.TestCase):
    def test_16kb_native_load_segments_pass(self):
        self.assertEqual(load_segment_alignments(elf()), [16384])

    def test_4kb_library_and_misaligned_segments_fail(self):
        for data in (elf(4096), elf(16384, 1)):
            with self.subTest(data=data[112:120]), self.assertRaisesRegex(ValueError, "16 KB"):
                load_segment_alignments(data)

    def test_truncated_or_non_elf_input_fails(self):
        for data in (b"not-an-elf", elf()[:100]):
            with self.assertRaises(ValueError):
                load_segment_alignments(data)


class SignatureTests(unittest.TestCase):
    def test_expected_test_signature_remains_update_compatible(self):
        output = "V2 Signer: certificate SHA-256 digest: " + TEST_CERTIFICATE
        self.assertEqual(verify_signer(output, "test", RELEASE), [TEST_CERTIFICATE])
        with self.assertRaisesRegex(ValueError, "Samsung test certificate"):
            verify_signer(output.replace(TEST_CERTIFICATE, "a" * 64), "test", RELEASE)

    def test_production_rejects_debug_and_missing_owner_certificates(self):
        output = "Signer #1 certificate SHA-256 digest: " + TEST_CERTIFICATE
        with self.assertRaisesRegex(ValueError, "not recorded"):
            verify_signer(output, "production", RELEASE)
        release = {**RELEASE, "uploadCertificateSha256": "a" * 64}
        with self.assertRaisesRegex(ValueError, "test or unexpected"):
            verify_signer(output, "production", release)
        self.assertEqual(verify_signer(output.replace(TEST_CERTIFICATE, "a" * 64), "production", release), ["a" * 64])


if __name__ == "__main__":
    unittest.main()
