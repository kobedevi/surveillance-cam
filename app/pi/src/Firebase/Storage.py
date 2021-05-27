from google.cloud import storage
import os

def getBucket():
    storage_client = storage.Client.from_service_account_json(os.path.abspath("Firebase/serviceAccountKey.json"));
    bucket = storage_client.bucket('iot-werkstuk.appspot.com')

    return bucket

def uploadFile(source, destination):
    '''Upload a file to the Firebase Storage

    Args:
        source (string): The location of the file to be uploaded
        destination (string): The name of the file in the Storage
            A forward slash can be used to store the file in a subfolder

    Returns:
        string: The destination argument which can be used to reference the file
    '''

    # Create blob
    bucket = getBucket()
    blob = bucket.blob(destination)

    # Upload file
    blob.upload_from_filename(source)
    blob.make_public()
    print("File {} uploaded to {}.".format(source, destination))

    return destination

def getPublicURL(path):
    # Get blob
    bucket = getBucket()
    blob = bucket.blob(path)
    print(blob.public_url)
    return blob.public_url