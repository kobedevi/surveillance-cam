from Firebase import Firestore
from gpiozero import LED

cameraLed = LED(14)
recordingLed = LED(22)

def toggle(enabled):
    if(Firestore.settings["led"] and Firestore.settings["running"]):
        cameraLed.on()
    else:
        cameraLed.off()

def on(time):
    if(Firestore.settings["led"]):
        recordingLed.on()

def off(time):
    recordingLed.off()