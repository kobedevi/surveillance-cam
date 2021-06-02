import firebase_admin
from firebase_admin import credentials
import os

def init():
  '''Initialize the Firebase connection'''
  
  pathToKey = os.path.dirname(__file__) + '/serviceAccountKey.json'

  cred = credentials.Certificate(pathToKey)
  firebase_admin.initialize_app(cred)
