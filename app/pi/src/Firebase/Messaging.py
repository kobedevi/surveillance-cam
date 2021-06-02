from firebase_admin import messaging
from Firebase import Firestore
from Firebase import Storage

PUSH_TITLE = 'Motion detected!'

def sendPushNotification(registrationTokens, title, imgUrl):
    '''Send a push notification with Firebase Cloud Messaging.
    Remove all tokens from Firebase that failed.

    Args:
        registrationTokens (list): A list of token to send a notification to.
        title (string): The title of the notification.
        imgUrl (string): The URL of the image that will be atatched to the notification.
            Note: Not all devices support showing images.
    '''

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
    '''Send a push notification with image.

    Args:
        imgPath (string): The path to the image in the Firebase Storage.
    '''

    imgUrl = Storage.getPublicURL(imgPath)

    sendPushNotification(Firestore.settings['registrationTokens'], PUSH_TITLE, imgUrl)


def removeFailedTokens(response, registrationTokens):
    '''Remove a list of tokens from the Firestore.

    Args:
        response: The response object when calling messaging.send_multicast()
        registrationTokens (list): The list of all tokens
    '''

    if response.failure_count > 0:
        # Get failed tokens
        responses = response.responses
        failedTokens = []
        for i, res in enumerate(responses):
            if not res.success:
                failedTokens.append(registrationTokens[i])

        # Remove tokens
        Firestore.removeRegistrationTokens(failedTokens)
