from Firebase import Firebase
from Firebase import Firestore
import Camera
from time import sleep
import sys

def tester(running):
    print(running)

def main():
    Firebase.init()
    Camera.init()

    # Attach snapshot listener and callbacks
    # Firestore.onSettingsChange('running', changeCameraState)
    Firestore.listenToSettings()
    Camera.start()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)