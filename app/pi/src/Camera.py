from picamera.array import PiRGBArray
from picamera import PiCamera
from datetime import datetime
from time import sleep
import subprocess
import os
from Firebase import Firestore
from Firebase import Messaging
from Firebase import Storage
import Motion

camera = None

# Set up camera
def init():
	global camera
	camera = PiCamera()
	camera.resolution = (640, 480)
	camera.framerate = 25
	camera.annotate_text_size = 15

def start():
	# Allow the camera to adjust to lighting/white balance
	sleep(2)
	
	addAnnotation()

	# Add callbacks to call when motion is detected
	Motion.onMotion(takePicture)
	Motion.onMotion(startRecording)
	Motion.onMotionEnd(stopRecording)

	rawCapture = PiRGBArray(camera, size = camera.resolution)
	# Start capturing frames
	for f in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
		if Firestore.settings and Firestore.settings['running'] :
			Motion.checkForMotion(f.array)
		else: 
			sleep(0.025)

		# Clear the stream in preparation for the next frame
		rawCapture.truncate(0)

# def stop():
# 	global camera

# 	Motion.clearCallbacks()
# 	camera.close()
# 	camera = None

def addAnnotation():
	# def addTimestamp():
	global camera

	# Show timestamp
	while camera.recording:
		camera.annotate_text = datetime.now().strftime('%A %d %B %Y %H:%M:%S')
		camera.wait_recording(0.3)
	else :
		camera.annotate_text = datetime.now().strftime('%A %d %B %Y %H:%M:%S')

def takePicture(time):
	dirname = os.path.join(os.path.dirname(__file__), 'out/')
	filename = getFilenameFromTime(time, '.jpg')

	# Take picture
	camera.capture(dirname + filename)

	# Upload photo
	path = Storage.uploadFile('out/' + filename, 'photos/' + filename)
	Firestore.addFileToDocument(path, 'photo', time)

	# Notify user
	Messaging.notifyUsersWithPicture(path)

def startRecording(time):
	dirname = os.path.join(os.path.dirname(__file__), 'out/')
	filename = getFilenameFromTime(time)

	camera.start_recording(dirname + filename + '.h264')
	addAnnotation()

def stopRecording(time):
	global camera

	if (not camera.recording):
		return
	
	camera.stop_recording()

	# Convert h264 to mp4
	filename = getFilenameFromTime(time)
	convert(filename)

	# Upload video
	path = Storage.uploadFile('out/' + filename + '.mp4', 'videos/' + filename + '.mp4')
	Firestore.addFileToDocument(path, 'video', time)

def convert(filename) :
	# Convert the h264 format to the mp4 format
	command = 'MP4Box -add ' + 'out/' + filename + '.h264 out/' + filename + '.mp4'
	subprocess.call([command], shell=True)
	os.remove('out/' + filename + '.h264')

def getFilenameFromTime(time, ext=''):
	return time.strftime('%Y%m%dT%H%M%S') + ext