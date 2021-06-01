from Firebase import Firebase
from Firebase import Firestore
from Camera import Camera
# from Actuators import Led
# from Actuators import Buzzer
from time import sleep
import sys

def main():
    Firebase.init()
    Camera.init()

    Firestore.listenToSettings()

    # Firestore.onSettingsChange('led', Led.toggle)
    # Firestore.onSettingsChange('buzzer', Buzzer.toggle)

    Camera.start()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)