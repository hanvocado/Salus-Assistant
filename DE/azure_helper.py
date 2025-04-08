from azure.identity import ClientSecretCredential
from azure.storage.blob import BlobServiceClient
import requests, io, os, time
from dotenv import load_dotenv

load_dotenv()

# Azure config
client_id = os.getenv('AZURE_CLIENT_ID')
tenant_id = os.getenv('AZURE_TENANT_ID')
client_secret = os.getenv('AZURE_CLIENT_SECRET')
account_url = os.getenv('AZURE_STORAGE_URL')
container_name = 'vietnamese-food-images'
token_credential = ClientSecretCredential(
    client_id=client_id,
    tenant_id=tenant_id,
    client_secret=client_secret
)

blob_service_client = BlobServiceClient(
    account_url=account_url,
    credential=token_credential)

container_client = blob_service_client.get_container_client(container=container_name)
try:
    container_client.create_container()
except Exception:
    pass

def upload_img_by_url(image_name, image_url):
    azure_src = None
    for i in range(3):
        try:
            image_data = requests.get(image_url).content
            print(f'Start upload {image_name}')
            container_client.upload_blob(name=image_name, data=io.BytesIO(image_data), overwrite=True)
            azure_src = f'{account_url}{container_name}/{image_name}' 
            break 
        except requests.exceptions.RequestException as e:
            print(f'Retrying {i + 1} times for {image_name}') 
            time.sleep(2)

    return azure_src