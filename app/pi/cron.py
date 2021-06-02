from src.Firebase import Firebase
from src.Firebase import Firestore
from src.Firebase import Storage
from datetime import datetime, timedelta
import pytz
from time import sleep
import sys

def main():
  Firebase.init()

  settings = Firestore.getSettings()

  removeDate = pytz.timezone('Europe/Brussels').localize(datetime.now()) - timedelta(settings['daysBeforeRemoval'])
  oldDocs = Firestore.getOldDocs(removeDate)

  for doc in oldDocs:
    # Get all recordings
    recordings = doc.reference.collection('recordings').get()

    # Delete recordings
    deletedRecordings = 0
    for recording in recordings:
      recordingDict = recording.to_dict()

      # Check if recording is locked
      if not recordingDict['lock']:
        if 'photo' in recordingDict:
          Storage.deleteFile(recordingDict['photo'])

        if 'video' in recordingDict:
          Storage.deleteFile(recordingDict['video'])

        recording.reference.delete()
        deletedRecordings += 1

    # Delete doc if no recordings left
    if len(recordings) == deletedRecordings:
      doc.reference.delete()

try:
  main()
finally:
  sys.exit(0)