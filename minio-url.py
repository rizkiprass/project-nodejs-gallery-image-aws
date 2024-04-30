# Construct the URL
bucket_name = 'images-bucket'
object_name = 'popcat.jpg'
url = f"http://localhost:9000/{bucket_name}/{object_name}"
print("Public URL for the image:", url)