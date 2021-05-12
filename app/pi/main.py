import Camera
import Firebase
import Motion
from time import sleep
import sys

def main():
    while True:
      sleep(60)

try:
    main()
except (KeyboardInterrupt, SystemExit):
    print('Exiting program')
finally:
    sys.exit(0)