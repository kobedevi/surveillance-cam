# Admin SDK configuration snippet
import firebase_admin
from firebase_admin import credentials, messaging
import os

print(os.path.abspath("serviceAccountKey.json"))

cred = credentials.Certificate(os.path.abspath("Firebase/serviceAccountKey.json"))
firebase_admin.initialize_app(cred)

def sendPush(title, msg, registration_tokens, dataObject = None):
  # See documentation on defining a message payload.
  message = messaging.MulticastMessage(
      notification = messaging.Notification(
          title = title,
          body = msg,
      ),
      data = dataObject,
      tokens = registration_tokens,
  )

  # Send a message to the device corresponding to the provided registration token.
  response = messaging.send_multicast(message)
  # Response is a message ID string.
  print('Successfully sent message:', response)

  if response.failure_count > 0:
    responses = response.responses
    failed_tokens = []
    for idx, resp in enumerate(responses):
        if not resp.success:
            # The order of responses corresponds to the order of the registration tokens.
            failed_tokens.append(registration_tokens[idx])
    print('List of tokens that caused failures: {0}'.format(failed_tokens))