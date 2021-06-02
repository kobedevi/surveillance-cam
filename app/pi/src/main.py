from Firebase import Firebase
from Firebase import Firestore
from Camera import Camera
from Actuators import Led
from time import sleep
import sys

def main():
    Firebase.init()
    Camera.init()

    Firestore.listenToSettings()

    Firestore.onSettingsChange('running', Led.toggle)
    Firestore.onSettingsChange('led', Led.toggle)

    Camera.start()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)