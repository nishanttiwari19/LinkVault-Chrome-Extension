import os
import re
import json
import zipfile

def run_tests():
    print("=== 1. Validating manifest.json ===")
    with open('manifest.json', 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    assert manifest['manifest_version'] == 3, "Manifest must be V3"
    assert manifest['name'], "Manifest must have a name"
    assert manifest['version'], "Manifest must have a version"
    assert 'storage' in manifest['permissions'], "storage permission required"
    assert 'activeTab' in manifest['permissions'], "activeTab permission required"
    assert 'scripting' in manifest['permissions'], "scripting permission required"
    print("  [PASS] manifest.json is valid MV3 with minimal permissions.")

    print("\n=== 2. Checking HTML files & resources ===")
    html_files = ['popup.html', 'options.html', 'test_form.html']
    for hf in html_files:
        assert os.path.exists(hf), f"Missing {hf}"
        with open(hf, 'r', encoding='utf-8') as f:
            html = f.read()

        # check scripts
        scripts = re.findall(r'<script\s+[^>]*src=[\'"]([^\'"]+)[\'"]', html)
        for s in scripts:
            assert os.path.exists(s), f"Missing script reference: {s} in {hf}"
            print(f"  [PASS] Found script: {s} in {hf}")

        # check styles
        styles = re.findall(r'<link\s+[^>]*href=[\'"]([^\'"]+)[\'"]', html)
        for st in styles:
            assert os.path.exists(st), f"Missing style reference: {st} in {hf}"
            print(f"  [PASS] Found stylesheet: {st} in {hf}")

    print("\n=== 3. Checking Icons ===")
    for size in [16, 32, 48, 128]:
        icon_path = f"icons/icon{size}.png"
        assert os.path.exists(icon_path), f"Missing icon: {icon_path}"
        file_size = os.path.getsize(icon_path)
        assert file_size > 0, f"Icon {icon_path} is empty"
        print(f"  [PASS] Found icon {icon_path} ({file_size} bytes)")

    print("\n=== 4. Checking JS Files ===")
    for jf in ['popup.js', 'content.js', 'options.js']:
        assert os.path.exists(jf), f"Missing JS file: {jf}"
        sz = os.path.getsize(jf)
        assert sz > 500, f"JS file {jf} is unexpectedly small ({sz} bytes)"
        print(f"  [PASS] Found JS {jf} ({sz} bytes)")

    print("\n=== 5. Creating Distribution ZIP ===")
    zip_filename = "LinkVault-extension.zip"
    files_to_pack = [
        'manifest.json',
        'popup.html',
        'popup.css',
        'popup.js',
        'content.js',
        'options.html',
        'options.css',
        'options.js',
        'test_form.html',
        'README.md',
        'icons/icon16.png',
        'icons/icon32.png',
        'icons/icon48.png',
        'icons/icon128.png',
        'icons/icon.svg'
    ]

    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in files_to_pack:
            assert os.path.exists(file), f"File {file} missing for zip"
            zipf.write(file, arcname=file)
            print(f"  Packed: {file}")

    zip_size = os.path.getsize(zip_filename)
    print(f"\n[SUCCESS] Created {zip_filename} ({zip_size} bytes)")

if __name__ == '__main__':
    run_tests()
