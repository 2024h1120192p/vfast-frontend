import os
from PIL import Image

input_folder  = "D:\\Codes\\VFASTPrototypeFrontend\\src\\img\\VFAST_photos"
output_folder = "D:\\Codes\\VFASTPrototypeFrontend\\src\\img\\VFAST_photos_webp"

for root, dirs, files in os.walk(input_folder):
    # Recreate folder structure in the output directory
    relative_path = os.path.relpath(root, input_folder)
    output_path = os.path.join(output_folder, relative_path)
    os.makedirs(output_path, exist_ok=True)

    for file_name in files:
        if file_name.lower().endswith(('jpg', 'jpeg', 'png')):
            input_file_path = os.path.join(root, file_name)
            output_file_path = os.path.join(output_path, os.path.splitext(file_name)[0] + ".webp")

            # Convert and save as WebP
            try:
                img = Image.open(input_file_path)
                img.save(output_file_path, "webp", quality=70)
                print(f"Converted: {input_file_path} -> {output_file_path}")
            except Exception as e:
                print(f"Error processing {input_file_path}: {e}")

print("Conversion complete!")
