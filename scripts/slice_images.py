import os
from PIL import Image

# Path to the source image
source_image_path = r'C:\Users\chakr\.gemini\antigravity-ide\brain\96220cf4-9287-44f5-ab25-25cad510818e\media__1782148772274.png'
base_output_dir = r'C:\Users\chakr\Downloads\phonepartsdb\public\images\devices'

# Mapping grid positions to phone slugs.
# The grid is 2 rows by 8 columns.
# Top row:
# 0: phone-1
# 1: phone-2
# 2: phone-2a
# 3: phone-2a-plus
# 4: phone-3
# 5: phone-3a
# 6: phone-3a-pro
# 7: phone-4a (Assuming last one is 4a based on previous requirements)

# Bottom row:
# 8: cmf-phone-1
# 9: cmf-phone-1 (Light Green) - Skip or overwrite? We'll use the main one.
# 10: cmf-phone-1 (Orange)
# 11: cmf-phone-1 (Blue)
# 12: cmf-phone-1 (White)
# 13: cmf-phone-2-pro
# 14: cmf-phone-2-pro (Light Grey)
# 15: cmf-phone-2-pro (Orange)

grid_mapping = {
    0: 'phone-1',
    1: 'phone-2',
    2: 'phone-2a',
    3: 'phone-2a-plus',
    4: 'phone-3',
    5: 'phone-3a',
    6: 'phone-3a-pro',
    7: 'phone-4a',
    8: 'cmf-phone-1',
    13: 'cmf-phone-2-pro'
}

def slice_image():
    try:
        img = Image.open(source_image_path)
    except Exception as e:
        print(f"Failed to open image: {e}")
        return

    width, height = img.size
    
    # 8 columns, 2 rows
    cols = 8
    rows = 2
    
    crop_width = width // cols
    crop_height = height // rows
    
    # Margin to remove some text at the bottom if needed
    margin_bottom = int(crop_height * 0.15)
    
    image_types = ['hero.webp', 'front.webp', 'back.webp', 'perspective.webp', 'floating.webp', 'thumbnail.webp', 'compare.webp']
    
    count = 0
    for row in range(rows):
        for col in range(cols):
            slug = grid_mapping.get(count)
            if slug:
                left = col * crop_width
                top = row * crop_height
                right = (col + 1) * crop_width
                bottom = (row + 1) * crop_height - margin_bottom # Crop out the text
                
                cropped_img = img.crop((left, top, right, bottom))
                
                # Make background transparent if it's black (optional, maybe just keep it as is)
                # Save as WEBP
                
                out_dir = os.path.join(base_output_dir, slug)
                os.makedirs(out_dir, exist_ok=True)
                
                for img_type in image_types:
                    out_path = os.path.join(out_dir, img_type)
                    # Convert to RGB if saving as webp (if not already RGBA and we want transparency, but let's just save)
                    cropped_img.save(out_path, format='WEBP', quality=85)
                print(f"Saved images for {slug}")
            count += 1

if __name__ == '__main__':
    slice_image()
