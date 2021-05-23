from firebase_admin import firestore
from datetime import datetime

DOC_STALE_TIME = 600 # 10 minutes

def getCollection(collectionName):
    db = firestore.client()
    return db.collection(collectionName)

def getSettings():
    app_collection = get_collection('app')

    settings = app_collection.document('settings').get()

    return settings.to_dict();

def createDocument(dt):
    '''Creates a new Firebase document in the 'camera' collection

    Args:
        dt (datetime): The time of the first motion (datetime.datetime.now())
    
    Returns:
        DocumentReference: A Firestore reference to the created document
    '''

    docName = dt.strftime('%Y%m%dT%H%M%S')
    docRef = getCollection('camera').document(docName)
    docRef.set({
        'firstMotion': dt,
        'lastMotion': dt,
        'videos': []
    })

    return docRef

def storeVideo(fileName, dt):
    '''Updates the correct Firestore document with a reference to the video file.
    Creates a new document when the previous document has become stale.

    Args:
        filename (string): The name of the video in the Firebase Storage
        dt (datetime): The time of the detected motion (datetime.datetime.now())
    '''

    # Upload video
    # TODO: Not this function's concern
    # storageFileName = Storage.uploadFile('out/' + fileName, 'videos/' + fileName)

    # Get last doc from firestore
    query = getCollection('camera').order_by('firstMotion', direction=firestore.Query.DESCENDING).limit(1)
    docSnapshot = query.get()
    docRef = docSnapshot[0].reference if docSnapshot else createDocument(dt)
    doc = docRef.get().to_dict()


    # Compare time
    lastMotion = doc['lastMotion'].replace(tzinfo=None)
    timeSinceLastMotion = dt.timestamp() - lastMotion.timestamp()

    if (timeSinceLastMotion > DOC_STALE_TIME):
        docRef = createDocument(dt)
    
    docRef.update({
        'lastMotion': dt,
        'videos': firestore.ArrayUnion([fileName])
    })
