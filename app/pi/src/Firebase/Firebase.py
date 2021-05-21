import firebase_admin
from firebase_admin import credentials
import os

def init():
  pathToKey = os.path.abspath("Firebase/serviceAccountKey.json")

  cred = credentials.Certificate(pathToKey)
  firebase_admin.initialize_app(cred)
