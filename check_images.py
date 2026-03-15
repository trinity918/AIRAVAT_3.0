from PIL import Image

f = Image.open('public/fintech-track.png')
print("Fintech format:", f.format, "mode:", f.mode, "pixel 0,0:", f.getpixel((0,0)))

h = Image.open('public/healthcare-track.png')
print("Health format:", h.format, "mode:", h.mode, "pixel 0,0:", h.getpixel((0,0)))
