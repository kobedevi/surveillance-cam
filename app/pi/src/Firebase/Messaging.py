from firebase_admin import messaging
from Firebase import Firestore
from Firebase import Storage

PUSH_TITLE = 'Motion detected!'

def sendPushNotification(registrationTokens, title, imgUrl):
    # Define message payload
    message = messaging.MulticastMessage(
        notification = messaging.Notification(title = title, image = imgUrl),
        webpush = messaging.WebpushConfig(headers = { 'image': imgUrl }),
        tokens = registrationTokens,
    )

    # Send a message to the devices corresponding to the provided registration tokens
    response = messaging.send_multicast(message)

    # Response is a message ID string
    print('Successfully sent message:', response)

    # Show failed tokens
    if response.failure_count > 0:
        responses = response.responses
        failed_tokens = []
        for idx, resp in enumerate(responses):
            if not resp.success:
                # The order of responses corresponds to the order of the registration tokens.
                failed_tokens.append(registrationTokens[idx])
        print('List of tokens that caused failures: {0}'.format(failed_tokens))
        # TODO: Remove failed tokens from firestore

def notifyUsersWithPicture(imgPath):
    registrationTokens = Firestore.getSettings()
    imgUrl = Storage.getPublicURL(imgPath)

    sendPushNotification(registrationTokens, PUSH_TITLE, imgUrl)