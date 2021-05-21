import firebase_admin
from firebase_admin import credentials
import os

print(os.path.abspath("serviceAccountKey.json"))

cred = credentials.Certificate(os.path.abspath("Firebase/serviceAccountKey.json"))
firebase_admin.initialize_app(cred)
