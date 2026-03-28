import os
from pathlib import Path
from rembg import remove
from PIL import Image

images_dir = Path("c:/remix-of-techsheet-hub-88f32c82-main/public/images")
output_dir = Path("c:/remix-of-techsheet-hub-88f32c82-main/public/images-nobg")
output_dir.mkdir(exist_ok=True)

extensions = {".png", ".jpg", ".jpeg", ".webp"}

files = [f for f in images_dir.iterdir() if f.suffix.lower() in extensions]
print(f"Found {len(files)} images to process\n")

for i, img_path in enumerate(files, 1):
    out_path = output_dir / (img_path.stem + ".png")
    print(f"[{i}/{len(files)}] {img_path.name} -> {out_path.name}")
    try:
        with open(img_path, "rb") as inp:
            result = remove(inp.read())
        with open(out_path, "wb") as out:
            out.write(result)
        print(f"  OK")
    except Exception as e:
        print(f"  ERROR: {e}")

print("\nDone!")
