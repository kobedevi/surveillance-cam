from firebase_admin import firestore

# CAMERA COLLECTION

DOC_STALE_TIME = 300 # 5 minutes

def createDocument(dt, fileName):
    '''Create a new Firebase document in the 'camera' collection

    Args:
        dt (datetime): The time of the first motion (datetime.datetime.now())
        fileName (string): The name of the image in the Firebase Storage
    
    Returns:
        DocumentReference: A Firestore reference to the created document
    '''

    docName = dt.strftime('%Y%m%dT%H%M%S')
    docRef = _getCollection('camera').document(docName)
    docRef.set({
        'firstMotion': dt,
        'lastMotion': dt,
        'preview': fileName
    })

    return docRef


def addFileToDocument(fileName, field, dt):
    '''Update the correct Firestore document with a reference to the file inside the recordings subcollection.
    Create a new document when the previous document has become stale.

    Args:
        fileName (string): The name of the image or video in the Firebase Storage
        field ('photo'|'video'): The name of the document field where the file will be added to
        dt (datetime): The time of the detected motion (datetime.datetime.now())

    Notes:
        This function assumes that the picture will always be stored before the corresponding video.
    '''

    # Get most recent doc from firestore
    query = _getCollection('camera').order_by('firstMotion', direction=firestore.Query.DESCENDING).limit(1)
    docSnapshot = query.get()
    docRef = docSnapshot[0].reference if docSnapshot else createDocument(dt, fileName)
    doc = docRef.get().to_dict()

    # Compare time
    lastMotion = doc['lastMotion']
    timeSinceLastMotion = dt.timestamp() - lastMotion.timestamp()

    if (timeSinceLastMotion > settings['docStaleTime'] * 60):
        docRef = createDocument(dt, fileName)
    
    # Update document
    docRef.update({ 'lastMotion': dt })

    # Add file to recordings subcollection
    recName = dt.strftime('%Y%m%dT%H%M%S')
    recRef = docRef.collection('recordings').document(recName)
    recRef.set({
        'timeOfMotion': dt,
        field: fileName,
        'lock': False,
    }, merge=True)


# APP COLLECTION

settings = None
onSettingsChangeCallbacks = {
    'led': [],
    'running': [],
}

def getSettings():
    '''Get the settings document as a dict'''

    settings = _getCollection('app').document('settings').get()
    return settings.to_dict()


def listenToSettings():
    '''Listen to changes on the settings document.
    On snapshot:
     - Find the keys that changed value
     - Update the global settings dict with the new document
     - Execute all callbacks that listen to the changed key
    '''
    def onSnapshot(docSnapshot, changes, readTime):
        global settings

        settingsDoc = docSnapshot[0].to_dict()

        # Find changed keys
        changedKeys = []
        if (not settings):
            for key in settingsDoc:
                changedKeys.append(key)
        else :
            for key in settingsDoc:
                if (settingsDoc[key] != settings[key]):
                    changedKeys.append(key)        

        # Update settings
        settings = settingsDoc

        # Execute listeners of the changed keys
        executeSettingsCallbacks(changedKeys)
                
    settingsRef = _getCollection('app').document('settings')
    settingsRef.on_snapshot(onSnapshot)


def executeSettingsCallbacks(changedKeys):
    '''Execute all callbacks that listen to the given keys
    
    Args:
        changedKeys (list): The list of changed keys
    '''

    for key in changedKeys:
        if key in onSettingsChangeCallbacks:
            for callback in onSettingsChangeCallbacks[key]:
                callback(settings[key])

         
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


# CRON JOB

def getOldDocs(dt):
    '''Get all documents from the camera collection where the last motion occured before a given time
    
    Args:
        dt (datetime): The time that defines a document as 'old'
    '''

    return _getCollection('camera').where('lastMotion', '<', dt).get()


# HELPERS

def _getCollection(collectionName):
    '''Helper function to get a collection from the firestore.

    Args:
        collectionName (string): The name of the collection.
    '''

    db = firestore.client()
    return db.collection(collectionName)
