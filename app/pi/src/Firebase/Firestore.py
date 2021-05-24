from firebase_admin import firestore

DOC_STALE_TIME = 300 # 5 minutes

def getCollection(collectionName):
    db = firestore.client()
    return db.collection(collectionName)

def getSettings():
    settings = getCollection('app').document('settings').get()

    return settings.to_dict();

def createDocument(dt):
    '''Create a new Firebase document in the 'camera' collection

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
        'photos': [],
        'videos': []
    })

    return docRef

def addFileToDocument(filename, field, dt):
    '''Update the correct Firestore document with a reference to the video file.
    Create a new document when the previous document has become stale.

    Args:
        filename (string): The name of the video in the Firebase Storage
        field ('photos'|'videos'): The name of the document field where the file will be added to
        dt (datetime): The time of the detected motion (datetime.datetime.now())
    '''

    # Get most recent doc from firestore
    query = getCollection('camera').order_by('firstMotion', direction=firestore.Query.DESCENDING).limit(1)
    docSnapshot = query.get()
    print(dir(docSnapshot))
    docRef = docSnapshot[0].reference if docSnapshot else createDocument(dt)
    doc = docRef.get().to_dict()

    # Compare time
    lastMotion = doc['lastMotion'].replace(tzinfo=None)
    timeSinceLastMotion = dt.timestamp() - lastMotion.timestamp()

    if (timeSinceLastMotion > DOC_STALE_TIME):
        docRef = createDocument(dt)
    
    # Update document
    docRef.update({
        'lastMotion': dt,
        field: firestore.ArrayUnion([filename])
    })
