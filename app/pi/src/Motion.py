from picamera.array import PiRGBArray
from picamera import PiCamera
import threading
import time
import datetime
import cv2
import os
from Firebase import Firebase
import Camera as capturer

recording = False
Firebase.init()
camera = PiCamera()
camera.resolution = (640, 480)
camera.framerate = 30
camera.rotation = 0
rawCapture = PiRGBArray(camera, size = (640, 480))

def start():
    # initialize the camera and grab a reference to the raw camera capture
    avg = None
    motion_treshold = 60
    movement_frames = 0

    # allow the camera to adjust to lighting/white balance
    time.sleep(2)

    # initiate video or frame capture sequence
    for f in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
        # grab the raw array representation of the image
        frame = f.array
        text = 'Nothing'
        color = (0, 0, 255)
        
        # convert imags to grayscale &  blur the result
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (21, 21), 0)
        
        # initialize avg if it hasn't been done
        if avg is None:
            avg = gray.copy().astype("float")
            rawCapture.truncate(0)
            continue
        
        # accumulate the weighted average between the current frame and
        # previous frames, then compute the difference between the current
        # frame and running average
        cv2.accumulateWeighted(gray, avg, 0.05)
        frameDelta = cv2.absdiff(gray, cv2.convertScaleAbs(avg))

        # coonvert the difference into binary & dilate the result to fill in small holes
        thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        
        # show the result
        cv2.imshow("Delta + Thresh", thresh)

        # find contours or continuous white blobs in the image
        contours, hierarchy = cv2.findContours(thresh.copy(),cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
        
        # find the index of the largest contour
        for c in contours:
            if cv2.contourArea(c) > 800: # if contour area is less then 800 non-zero(not-black) pixels(white)
                (x, y, w, h) = cv2.boundingRect(c) # x,y are the top left of the contour and w,h are the width and hieght 
                cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 2)
                text = 'Motion'
                color = (0, 255, 0)
                movement_frames += 1
                if movement_frames >= motion_treshold:
                    threading.Thread(target=capture, args=(movement_frames, motion_treshold)).start()
                    movement_frames = 0
                    
        cv2.putText(frame, 'Status: ' + text + ' detected', (10,20), cv2.FONT_HERSHEY_SIMPLEX , 0.5, color, 2)
        cv2.putText(frame, datetime.datetime.now().strftime('%A %d %B %Y %I:%M:%S%p'), (10, frame.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX , 0.35, (0, 0, 255),1) 
        cv2.imshow("Video", frame)   

        # clear the stream in preparation for the next frame
        rawCapture.truncate(0)

        # if the 'q' key is pressed then break from the loop
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        
    cv2.destroyAllWindows()

def capture(frames, motion_thresh):
    if frames == motion_thresh :
        global recording
        dirname = os.path.join(os.path.dirname(__file__), 'out/')
        time = datetime.datetime.now().strftime('%Y-%m%d_%I-%M-%S')
        if recording == False:
            recording = True
            # PICTURE
            capturer.takePicture(camera, dirname, time)
            # RECORD
            recording = capturer.startRecording(camera, dirname, time)