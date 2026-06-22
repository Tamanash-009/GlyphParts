import os
from PIL import Image, ImageEnhance, ImageFilter

source_image_path = r'C:\Users\chakr\.gemini\antigravity-ide\brain\96220cf4-9287-44f5-ab25-25cad510818e\media__1782148772274.png'
base_output_dir = r'C:\Users\chakr\Downloads\phonepartsdb\public\images\devices'

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

def remove_black_bg_and_upscale():
    try:
        img = Image.open(source_image_path).convert('RGBA')
    except Exception as e:
        print(f"Failed to open image: {e}")
        return

    width, height = img.size
    cols = 8
    rows = 2
    crop_width = width // cols
    crop_height = height // rows
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
                bottom = (row + 1) * crop_height - margin_bottom
                
                cropped_img = img.crop((left, top, right, bottom))
                
                # Make black background transparent
                datas = cropped_img.getdata()
                new_data = []
                for item in datas:
                    # If the pixel is very dark (close to black), make it transparent
                    if item[0] < 15 and item[1] < 15 and item[2] < 15:
                        new_data.append((0, 0, 0, 0))
                    else:
                        new_data.append(item)
                        
                cropped_img.putdata(new_data)
                
                # Upscale by 4x for "4K quality" feel (Lanczos resampling)
                new_size = (cropped_img.width * 4, cropped_img.height * 4)
                upscaled_img = cropped_img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Enhance sharpness slightly
                enhancer = ImageEnhance.Sharpness(upscaled_img)
                upscaled_img = enhancer.enhance(1.5)
                
                # Enhance contrast slightly
                contrast = ImageEnhance.Contrast(upscaled_img)
                upscaled_img = contrast.enhance(1.1)
                
                out_dir = os.path.join(base_output_dir, slug)
                os.makedirs(out_dir, exist_ok=True)
                
                for img_type in image_types:
                    out_path = os.path.join(out_dir, img_type)
                    upscaled_img.save(out_path, format='WEBP', quality=100)
                print(f"Processed and enhanced {slug}")
            count += 1

if __name__ == '__main__':
    remove_black_bg_and_upscale()
