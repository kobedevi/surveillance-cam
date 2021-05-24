import threading
import datetime
import cv2

MOTION_THRESHOLD = 50 # 2 seconds @25fps
CONTOUR_MIN_AREA = 800

avg = None # The initial frame to compare the other frames with
motionFrames = 0 # Current amount of frames where motion is detected
onMotionCallbacks = []
onMotionEndCallbacks = []

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

def addMotionFrame():
    '''Increment motion frames and call callbacks if threshold is reached'''
    global motionFrames
    motionFrames += 1

    # Check if threshold is reached (i.e. motion detected)
    if (motionFrames == MOTION_THRESHOLD):
        # Execute subscribers with time of motion
        time = datetime.datetime.now()
        for callback in onMotionCallbacks:
            threading.Thread(target=callback, args=(time,)).start()

def resetMotionFrames():
    '''Reset motion frames and call callbacks if threshold was reached'''
    
    global motionFrames
    if (motionFrames >= MOTION_THRESHOLD):
        for callback in onMotionEndCallbacks:
            threading.Thread(target=callback).start()
            
    motionFrames = 0

def checkForMotion(frame):
    global motionFrames
    print(motionFrames)
    '''Compares the current frame with the average frame and
    increments motion frames if the difference exceeds CONTOUR_MIN_AREA.
    If no average is set, it will use the frame to set the initial average.

    Args:
        frame (array): The array returned when reading PiArrayOutput.array.
    '''

    # text = 'Nothing'
    # color = (0, 0, 255)

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
    contours, hierarchy = cv2.findContours(thresh.copy(),cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

    # Reset counter when no motion is detected
    if len(contours) == 0:
        resetMotionFrames()
        return
    
    # find the index of the largest contour
    for c in contours:
        if cv2.contourArea(c) > CONTOUR_MIN_AREA:
            # (x, y, w, h) = cv2.boundingRect(c) # x,y are the top left of the contour and w,h are the width and hieght 
            # cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 2)
            # text = 'Motion'
            # color = (0, 255, 0)
            # movement_frames += 1
            # if movement_frames >= motion_treshold:
            #     movement_frames = 0
            addMotionFrame()
            break
                
    # cv2.putText(frame, 'Status: ' + text + ' detected', (10,20), cv2.FONT_HERSHEY_SIMPLEX , 0.5, color, 2)
    # cv2.putText(frame, datetime.datetime.now().strftime('%A %d %B %Y %I:%M:%S%p'), (10, frame.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX , 0.35, (0, 0, 255),1) 
    # cv2.imshow("Video", frame)   


    # if the 'q' key is pressed then break from the loop
    # key = cv2.waitKey(1) & 0xFF
    # if key == ord('q'):
    #     break
    
