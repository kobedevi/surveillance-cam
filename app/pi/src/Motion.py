from gpiozero import MotionSensor
from time import time

class Motion:
  pir = None
  active = False
  motion = False
  lastMotion = None

  def __init__(self, pin):
    print('Init MotionSensor')

    self.pir = MotionSensor(pin, queue_len = 10);
    self.active = False
    self.motion = False
    self.lastMotion = None
  
  def start(self):
    print('Starting')
    self.active = True

    while self.active:
      self.pir.wait_for_motion()
      self.motionDetected()
      self.pir.wait_for_no_motion()
      self.noMotionDetected()

  def stop(self):
    self.active = False
  
  def motionDetected(self):
    self.lastMotion = time()
    print('Motion')

  def noMotionDetected(self):
    print('No motion')
