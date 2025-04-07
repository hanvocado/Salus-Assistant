from azure.identity import ClientSecretCredential
from azure.storage.blob import BlobServiceClient
import requests, io, os
from dotenv import load_dotenv

load_dotenv()

# Azure config
client_id = os.getenv('AZURE_CLIENT_ID')
tenant_id = os.getenv('AZURE_TENANT_ID')
client_secret = os.getenv('AZURE_CLIENT_SECRET')
account_url = os.getenv('AZURE_STORAGE_URL')
container_name = 'food-images'
token_credential = ClientSecretCredential(
    client_id=client_id,
    tenant_id=tenant_id,
    client_secret=client_secret
)

blob_service_client = BlobServiceClient(
    account_url=account_url,
    credential=token_credential)

container_client = blob_service_client.get_container_client(container=container_name)

def upload_img_by_url(image_name, image_url):
    try:
        image_data = requests.get(image_url).content
        container_client.upload_blob(name=image_name, data=io.BytesIO(image_data), overwrite=True)
        print(f'Upload {image_name}')
        return f'{account_url}container_name/{image_name}'
    
    except Exception as e:
        print(f"Error Upload to Azure {image_name}: {e}")    