from Firebase import Firebase
from Firebase import Firestore
import Camera
from time import sleep
import sys

def main():
    Firebase.init()
    Camera.init()

    Firestore.listenToSettings()
    Camera.start()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)