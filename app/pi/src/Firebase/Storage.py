# Imports the Google Cloud client library
from google.cloud import storage
import os

def uploadFile(sourceFileName, destinationFileName):
    storage_client = storage.Client.from_service_account_json(os.path.abspath("Firebase/serviceAccountKey.json"));
    bucket = storage_client.bucket('iot-werkstuk.appspot.com')
    blob = bucket.blob(destinationFileName)

    blob.upload_from_filename(sourceFileName)

    print("File {} uploaded to {}.".format(sourceFileName, destinationFileName))
