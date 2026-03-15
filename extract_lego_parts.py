"""
Manual bounding-box extraction of LEGO components from comps.jpg.
Since the objects overlap and automated segmentation struggles,
we define crop regions manually based on visual inspection,
then remove the gradient background within each crop.
Image is 1024x434 pixels.
"""
import os
import numpy as np
from PIL import Image, ImageFilter

SRC     = "public/comps.jpg"
OUT_DIR = "public/lego-parts"
os.makedirs(OUT_DIR, exist_ok=True)
for f in os.listdir(OUT_DIR):
    if f.endswith(".png"):
        os.remove(os.path.join(OUT_DIR, f))

img = Image.open(SRC).convert("RGB")
arr = np.array(img, dtype=np.float32)
h, w = arr.shape[:2]
print(f"Image: {w}x{h}")

# Estimate gradient background using heavy blur
bg = np.array(img.filter(ImageFilter.GaussianBlur(radius=60)), dtype=np.float32)

# Manual bounding boxes: (left, top, right, bottom)
# Divided left half, right half, corners and clusters visible in the image
REGIONS = {
    "xwing_left_top":    (0,   0,   230, 200),
    "spinner_left":      (0,   130, 250, 434),
    "bricks_top_left":   (120, 0,   420, 140),
    "bricks_top_right":  (600, 0,   890, 140),
    "xwing_top_right":   (700, 0,   1024,200),
    "xwing_right":       (800, 100, 1024,434),
    "panels_right":      (750, 150, 1024,434),
    "bricks_bottom_mid": (150, 300, 650, 434),
    "weapons_bottom":    (400, 300, 800, 434),
}

FG_THRESH = 20

for name, (x0, y0, x1, y1) in REGIONS.items():
    # Clamp
    x0 = max(0, x0); y0 = max(0, y0)
    x1 = min(w, x1); y1 = min(h, y1)

    crop_rgb = arr[y0:y1, x0:x1].copy()
    crop_bg  = bg[y0:y1, x0:x1]
    diff = np.sqrt(np.sum((crop_rgb - crop_bg) ** 2, axis=2))

    alpha = np.where(diff > FG_THRESH, 255, 0).astype(np.uint8)

    out = np.zeros((y1-y0, x1-x0, 4), dtype=np.uint8)
    out[:, :, :3] = crop_rgb.astype(np.uint8)
    out[:, :, 3]  = alpha

    p = os.path.join(OUT_DIR, f"{name}.png")
    Image.fromarray(out, "RGBA").save(p)
    print(f"  Saved {p}")

print(f"\nDone! Saved {len(REGIONS)} crops to {OUT_DIR}/")
