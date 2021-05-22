from Firebase import Firebase
from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
from time import sleep
import sys

from firebase_admin import firestore


def main():
    Firebase.init()
    settings = Firestore.getSettings()
    
    # Module tests:
    # Messaging.sendPush('Title', 'Message', settings['registrationTokens'])
    # Storage.uploadFile('main.py', 'main.py')

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    sys.exit(0)