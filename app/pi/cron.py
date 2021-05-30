from src.Firebase import Firebase
from src.Firebase import Firestore
from datetime import datetime, timedelta
import sys

def main():
  Firebase.init()

  today = datetime.now()
  lastWeek = today - timedelta(7)
  # yesterday = today - timedelta(1)

  Firestore.removeOldFiles(lastWeek)

  print('cron job done')

try:
  main()
finally:
  sys.exit(0)