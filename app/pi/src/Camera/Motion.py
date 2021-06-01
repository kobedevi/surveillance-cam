import cv2
import threading
from datetime import datetime
import pytz

MOTION_THRESHOLD = 50 # Number of consecutive frames where motion is detected
CONTOUR_MIN_AREA = 800 # Minimum contour area to qualify as motion (cv2.findContours())

avg = None # The initial frame to compare the other frames with
motionFrames = 0 # Current amount of frames where motion is detected
noMotionFrames = 0 # Current amount of frames where no motion is detected
onMotionCallbacks = [] # Callbacks to execute when motionFrames reaches threshold
onMotionEndCallbacks = [] # Callbacks to execute when noMotionFrames reaches threshold
timeOfMotion = None # Time when current motion started

def checkForMotion(frame):
    global motionFrames
    print(motionFrames)
    '''Compares the current frame with the average frame and
    increments motion frames if the difference exceeds CONTOUR_MIN_AREA.
    If no average is set, it will use the frame to set the initial average.

    Args:
        frame (array): The array returned when reading PiArrayOutput.array.
    '''

    # Convert frame to grayscale and blur
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)

    # Set the first frame as average
    global avg
    if avg is None:
        avg = gray.copy().astype("float")
        return
    
    # Find the absolute difference between average and current frame
    cv2.accumulateWeighted(gray, avg, 0.05)
    frameDelta = cv2.absdiff(gray, cv2.convertScaleAbs(avg))

    # Threshold and dilate the difference
    thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.dilate(thresh, None, iterations=2)
    
    # show the result
    # cv2.imshow("Delta + Thresh", thresh)

    # Find contours
    contours, hierarchy = cv2.findContours(thresh.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Reset counter when no motion is detected
    if len(contours) == 0:
        handleNoMotionFrame()
        return
    
    # find the index of the largest contour
    for c in contours:
        if cv2.contourArea(c) > CONTOUR_MIN_AREA:
            handleMotionFrame()
            break


def handleMotionFrame():
    '''Increment motionFrames. Execute callbacks if threshold is reached'''

    global motionFrames
    global noMotionFrames
    global timeOfMotion

    motionFrames += 1
    noMotionFrames = 0

    # Check if threshold is reached (i.e. motion detected)
    if (motionFrames == MOTION_THRESHOLD):
        # Execute callbacks with time of motion
        timeOfMotion = pytz.timezone('Europe/Brussels').localize(datetime.now())
        for callback in onMotionCallbacks:
            threading.Thread(target=callback, args=(timeOfMotion,)).start()

def handleNoMotionFrame():
    '''Increment noMotionFrames. Execute callbacks and reset if threshold is reached
        Resets if motionFrames has not reached threshold (i.e. currently no motion)
    '''
    global motionFrames
    global noMotionFrames
    global timeOfMotion

    # If there is currently motion detected
    if (motionFrames >= MOTION_THRESHOLD):
        noMotionFrames += 1

        # Check if threshold is reached (i.e. motion ended)
        if (noMotionFrames == MOTION_THRESHOLD):  
            # Execute callbacks with time of motion      
            for callback in onMotionEndCallbacks:
                threading.Thread(target=callback, args=(timeOfMotion,)).start()
            
            # Reset motion frames
            motionFrames = 0
            noMotionFrames = 0
            timeOfMotion = None
    else: 
        motionFrames = 0


def close():
    global noMotionFrames
    noMotionFrames = MOTION_THRESHOLD -1
    handleNoMotionFrame()


def onMotion(callback):
    '''Add a callback to execute when motion threshold is reached

    Args:
        callback (function): The function that will be called.
            The time of motion will be passed as an argument
    '''

    onMotionCallbacks.append(callback)

def onMotionEnd(callback):
    '''Add a callback to execute when motion threshold is reset after reaching threshold

    Args:
        callback (function): The function that will be called.
            The time of motion will be passed as an argument
    '''

    onMotionEndCallbacks.append(callback)

def clearCallbacks():
    global onMotionCallbacks
    global onMotionEndCallbacks

    onMotionCallbacks = []
    onMotionEndCallbacks = []