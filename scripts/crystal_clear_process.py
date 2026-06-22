import os
from PIL import Image

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

def crystal_clear_process():
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
                
                # Manual BFS Flood Fill to remove background safely without poking holes inside the phone
                pixels = cropped_img.load()
                cw, ch = cropped_img.size
                
                threshold = 12
                visited = set()
                queue = [(0, 0), (cw-1, 0), (0, ch-1), (cw-1, ch-1)]
                
                while queue:
                    x, y = queue.pop(0)
                    if (x, y) in visited: continue
                    visited.add((x, y))
                    
                    r, g, b, a = pixels[x, y]
                    
                    if r <= threshold and g <= threshold and b <= threshold and a > 0:
                        pixels[x, y] = (0, 0, 0, 0)
                        
                        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < cw and 0 <= ny < ch:
                                queue.append((nx, ny))
                
                # Upscale cleanly using Lanczos
                new_size = (cw * 4, ch * 4)
                upscaled_img = cropped_img.resize(new_size, Image.Resampling.LANCZOS)
                
                out_dir = os.path.join(base_output_dir, slug)
                os.makedirs(out_dir, exist_ok=True)
                for img_type in image_types:
                    upscaled_img.save(os.path.join(out_dir, img_type), format='WEBP', quality=100)
                print(f"Processed crystal clear {slug}")
            count += 1

if __name__ == '__main__':
    crystal_clear_process()
