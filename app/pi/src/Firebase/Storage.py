from google.cloud import storage
import os

def getBucket():
    '''Get the default Storage bucket.'''

    storage_client = storage.Client.from_service_account_json(os.path.dirname(__file__) + '/serviceAccountKey.json')
    bucket = storage_client.bucket('iot-werkstuk.appspot.com')

    return bucket


def uploadFile(source, destination):
    '''Upload a file to the Firebase Storage.

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

    # Delete local file
    os.remove(source)

    return destination


def deleteFile(path):
    '''Delete a file from the Firebase Storage.

    Args:
        path (string): The name of the file in the Storage
            A forward slash can be used to store the file in a subfolder
    '''

    bucket = getBucket()
    blob = bucket.blob(path)
    blob.delete()


def getPublicURL(path):
    '''Get the URL of a file in the Firebase Storage.

    Args:
        path (string): The path to the file in the Storage
            A forward slash can be used to store the file in a subfolder
    '''

    bucket = getBucket()
    blob = bucket.blob(path)

    return blob.public_url
