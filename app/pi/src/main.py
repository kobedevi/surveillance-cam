from Firebase import Firebase
# from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
from time import sleep
import sys

def main():
    Firebase.init()
    
    # Module tests:
    # print(Firestore.getSettings())
    # Messaging.sendPush('Title', 'Message', ['d64z9k3JPgRHUndOvefo0k:APA91bH5juBsWAEhWRfZs4vkoBLpZXdcMJN4vxLi1MxfLpbHUmvHXMA6SQWt_uVfwfVygMCnOB6YDhM12P8-16mGmktZ1p0cb-bWoXv7bRUtJe5Ktwd3rqC_aBE20Gk-K7Y7dI2YtM-q'])
    # Storage.uploadFile('main.py', 'main.py')

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    sys.exit(0)