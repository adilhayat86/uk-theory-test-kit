#!/usr/bin/env python3
"""Safely activate the 121-image offline gallery after extracting the prepared overlay.

Usage: unzip uk-theory-121-image-integration-overlay.zip -d /tmp/theory-images
       cp -R /tmp/theory-images/src/* src/
       cp -R /tmp/theory-images/docs/* docs/
       python3 scripts/activate-illustration-gallery.py
Run from the repository root. Keep all image statuses pending editorial review.
"""
from pathlib import Path
root = Path.cwd()
app = root / "App.tsx"
gallery = root / "src/components/IllustrationGallery.tsx"
registry = root / "src/data/illustrationLibrary.ts"
images = root / "src/assets/illustrations-v2"
assert app.exists() and gallery.exists() and registry.exists(), "Copy the full overlay first."
assert len(list(images.glob("*.png"))) == 121, "Expected 121 offline PNGs. Refusing partial install."
source = app.read_text(encoding="utf-8")
if "import IllustrationGallery from './src/components/IllustrationGallery';" in source:
    print("Illustration gallery already activated.")
    raise SystemExit(0)
changes = [
    ("import RoadSignsScreen from './src/components/RoadSignsScreen';",
     "import RoadSignsScreen from './src/components/RoadSignsScreen';\nimport IllustrationGallery from './src/components/IllustrationGallery';"),
    ("| 'roadSigns';", "| 'roadSigns' | 'illustrations';"),
    ("{tab === 'roadSigns' && <RoadSignsScreen onBack={() => setTab('home')} />}",
     "{tab === 'roadSigns' && <RoadSignsScreen onBack={() => setTab('home')} />}\n          {tab === 'illustrations' && <IllustrationGallery onBack={() => setTab('home')} />}"),
    ('<Text style={styles.scopeNote}>GB car theory preparation.',
     '<MenuCard index="03" title="Illustrated Revision Library" detail="121 offline draft signs, scenes and explanations" onPress={() => setTab(\'illustrations\')} />\n              <Text style={styles.scopeNote}>GB car theory preparation.'),
]
for old, new in changes:
    assert source.count(old) == 1, f"Expected one App.tsx anchor: {old[:75]}"
    source = source.replace(old, new, 1)
app.write_text(source, encoding="utf-8")
print("Gallery activated; question IDs, answers, SQLite and existing scored tests unchanged.")
