import Firebase.initFirebase
from Firebase.FCMManager import sendPush
from Firebase.Storage import uploadFile
from time import sleep
import sys

def main():
    # sendPush('Title', 'Message', [])
    uploadFile('main.py', 'main.py')

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    sys.exit(0)