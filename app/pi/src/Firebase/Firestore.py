from firebase_admin import firestore
import threading

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
    docRef = _getCollection('camera').document(docName)
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
    query = _getCollection('camera').order_by('firstMotion', direction=firestore.Query.DESCENDING).limit(1)
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
        'lastMotion': dt,
        field: firestore.ArrayUnion([filename])
    })

# APP COLLECTION

settings = None
changedKeys = []
settingsChanged = threading.Event()
onSettingsChangeCallbacks = {
    'running': [],
    'registrationTokens': [],
}

def getSettings():
    '''Get the settings document as a dict'''

    settings = _getCollection('app').document('settings').get()

    return settings.to_dict();

def listenToSettings():
    '''Listen to changes on the settings document.
    On snapshot:
     - Update the global settings dict with the new document
     - Store the changed keys in the global changedKeys list
     - Signal changes with the global Event
    '''
    def onSnapshot(docSnapshot, changes, readTime):
        global settings
        global changedKeys

        settingsDoc = docSnapshot[0].to_dict()

        # Set settings on initial snapshot
        if (not settings):
            settings = settingsDoc
            return
        
        # Find changed keys
        for key in settingsDoc:
            if (settingsDoc[key] != settings[key]):
                changedKeys.append(key)

        # Update and signal changes
        settings = settingsDoc
        settingsChanged.set()

    settingsRef = _getCollection('app').document('settings')
    settingsRef.on_snapshot(onSnapshot)

def waitForSettingsChange():
    '''Wait for the settingsChanged event to set.
    Then, execute the subscribed callbacks and clear the state.
    '''

    global changedKeys

    # Wait for event
    settingsChanged.wait()

    # Execute callbacks
    for key in changedKeys:
        for callback in onSettingsChangeCallbacks[key]:
            callback(settings[key])
    
    # Reset state
    changedKeys = []
    settingsChanged.clear()

def onSettingsChange(field, callback):
    '''Add a callback to execute when a field in the settings has changed.

    Args:
        field (string): One of the fields in the settings document.
        callback (function): The function that will be called.
            The value of the field will be passed as argument.
    '''

    onSettingsChangeCallbacks[field].append(callback)

def removeRegistrationTokens(registrationTokens):
    '''Remove registration tokens from the settings document.

    Args:
        registrationTokens (list): The tokens to remove. Must be a list.
    '''

    settingsRef = _getCollection('app').document('settings')
    settingsRef.update({'registrationTokens': firestore.ArrayRemove(registrationTokens)})

# HELPERS

def _getCollection(collectionName):
    '''Helper function to get a collection from the firestore.

    Args:
        collectionName (string): The name of the collection.
    '''

    db = firestore.client()
    return db.collection(collectionName)