from Firebase import Firebase
from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
import Camera
from time import sleep
import sys

# def changeCameraState(running):
#     if (running):
#         Camera.start()
#     else:
#         Camera.stop()

def main():
    Firebase.init()
    Camera.start()

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    Camera.stop()
    sys.exit(0)