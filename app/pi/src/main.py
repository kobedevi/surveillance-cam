from Firebase import Firebase
from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
from time import sleep
import sys
import Motion as Motion_detection

def main():
    Firebase.init()
    
    # Module tests:
    # settings = Firestore.getSettings()
    # Firestore.storeVideo('test.mp4', datetime.now())
    # Messaging.sendPush('Title', 'Message', settings['registrationTokens'])
    # Storage.uploadFile('main.py', 'main.py')

try:
    # main()
    Motion_detection.start()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    sys.exit(0)