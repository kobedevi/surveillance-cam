from firebase_admin import messaging
from Firebase import Firestore
from Firebase import Storage

PUSH_TITLE = 'Motion detected!'

def sendPushNotification(registrationTokens, title, imgUrl):
    # Define message payload
    message = messaging.MulticastMessage(
        notification = messaging.Notification(title = title, image = imgUrl),
        tokens = registrationTokens,
    )

    # Send a message to the devices corresponding to the provided registration tokens
    response = messaging.send_multicast(message)

    # Response is a message ID string
    print('Successfully sent message:', response)

    removeFailedTokens(response, registrationTokens)

def notifyUsersWithPicture(imgPath):
    settings = Firestore.getSettings()
    imgUrl = Storage.getPublicURL(imgPath)

    sendPushNotification(settings['registrationTokens'], PUSH_TITLE, imgUrl)

def removeFailedTokens(response, registrationTokens):
    if response.failure_count > 0:
        # Get failed tokens
        responses = response.responses
        failedTokens = []
        for i, res in enumerate(responses):
            if not res.success:
                failedTokens.append(registrationTokens[i])

        print('List of tokens that caused failures: {0}'.format(failedTokens))
        
        Firestore.removeRegistrationTokens(failedTokens)