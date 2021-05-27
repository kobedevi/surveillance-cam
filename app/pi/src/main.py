from Firebase import Firebase
from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
import Camera
import sys

def changeCameraState(running):
    if (running):
        print('starting camera')
        Camera.start()
    else:
        print('stopping camera')
        Camera.stop()

def main():
    Firebase.init()
    Firestore.listenToSettings();

    Firestore.onSettingsChange('running', changeCameraState);
    Camera.start()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)