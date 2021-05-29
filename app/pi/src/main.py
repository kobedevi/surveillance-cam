from Firebase import Firebase
from Firebase import Firestore
import Camera
import sys

def changeCameraState(running):
    if (running):
        print('starting camera')
        Camera.start()
    else:
        print('stopping camera')
        Camera.stop()

    # TODO: Test one-liner
    # Camera.start() if running else Camera.stop()

def main():
    Firebase.init()
    
    # Attach snapshot listener and callbacks
    Firestore.listenToSettings();
    Firestore.onSettingsChange('running', changeCameraState);

    Camera.start()

    while True:
        print('waiting for next change')
        Firestore.waitForSettingsChange()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)