from google.cloud import storage
from os.path import dirname

def getBucket():
    pathToKey = dirname(__file__) + '/serviceAccountKey.json'
    storage_client = storage.Client.from_service_account_json(pathToKey);
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

    # Delete local file
    os.remove(source)

    return destination

def deleteFile(fileName):
    bucket = getBucket()
    blob = bucket.blob(fileName)
    blob.delete()

def getPublicURL(path):
    bucket = getBucket()
    blob = bucket.blob(path)
    return blob.public_url