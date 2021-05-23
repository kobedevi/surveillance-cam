from Firebase import Firebase
from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
from time import sleep
import sys

def main():
    Firebase.init()
    
    # Module tests:
    # settings = Firestore.getSettings()
    # Firestore.storeVideo('test.mp4', datetime.now())
    # Messaging.sendPush('Title', 'Message', settings['registrationTokens'])
    # Storage.uploadFile('main.py', 'main.py')

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    sys.exit(0)