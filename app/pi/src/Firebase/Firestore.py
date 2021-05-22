from firebase_admin import firestore

def getSettings():
    db = firestore.client()

    settingsRef = db.collection('app').document('settings')
    settings = settingsRef.get()

    return settings.to_dict();
