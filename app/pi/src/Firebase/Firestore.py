from firebase_admin import firestore

# CAMERA COLLECTION

DOC_STALE_TIME = 300 # 5 minutes

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

def addFileToDocument(fileName, field, dt):
    '''Update the correct Firestore document with a reference to the video file.
    Create a new document when the previous document has become stale.

    Args:
        fileName (string): The name of the video in the Firebase Storage
        field ('photos'|'videos'): The name of the document field where the file will be added to
        dt (datetime): The time of the detected motion (datetime.datetime.now())
    '''

    # Get most recent doc from firestore
    query = getCollection('camera').order_by('firstMotion', direction=firestore.Query.DESCENDING).limit(1)
    docSnapshot = query.get()
    docRef = docSnapshot[0].reference if docSnapshot else createDocument(dt)
    doc = docRef.get().to_dict()

    # Compare time
    lastMotion = doc['lastMotion'].replace(tzinfo=None)
    timeSinceLastMotion = dt.timestamp() - lastMotion.timestamp()

    if (timeSinceLastMotion > DOC_STALE_TIME):
        docRef = createDocument(dt)
    
    # Update document
    docRef.update({
        'lastMotion': dt
    })

    # Add file to recordings subcollection
    recName = dt.strftime('%Y%m%dT%H%M%S')
    recRef = docRef.collection('recordings').doc(recName)
    recRef.set({
        'timeOfMotion': dt,
        field: fileName
    }, {'merge': True})

# APP COLLECTION

settings = None
onSettingsChangeCallbacks = {
    'running': [],
    'registrationTokens': [],
}

def getSettings():
    settings = getCollection('app').document('settings').get()

    return settings.to_dict();

def listenToSettings():
    def onSnapshot(docSnapshot, changes, readTime):
        global settings

        settingsDoc = docSnapshot[0].to_dict()

        # Set settings on initial snapshot
        if (not settings):
            settings = settingsDoc
            return
        
        # Find changed key
        for key in settingsDoc:
            if (settingsDoc[key] != settings[key]):
                changedKey = key
                break

        # Update settings
        settings = settingsDoc

        # Execute callbacks with changed value
        for callback in onSettingsChangeCallbacks[changedKey]:
            callback(settings[key])

    settingsRef = getCollection('app').document('settings')
    settingsRef.on_snapshot(onSnapshot)

def onSettingsChange(field, callback):
    onSettingsChangeCallbacks[field].append(callback)

def removeRegistrationTokens(registrationTokens):
    settingsRef = getCollection('app').document('settings')
    settingsRef.update({'registrationTokens': firestore.ArrayRemove(registrationTokens)})

# HELPERS

def getCollection(collectionName):
    db = firestore.client()
    return db.collection(collectionName)