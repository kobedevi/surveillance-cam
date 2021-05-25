from picamera.array import PiRGBArray
from picamera import PiCamera
from datetime import datetime
from time import sleep
import subprocess
import os
from Firebase import Firestore
from Firebase import Storage
import Motion

# Set up camera
camera = PiCamera()
camera.resolution = (640, 480)
camera.framerate = 25
camera.annotate_text_size = 15
rawCapture = PiRGBArray(camera, size = camera.resolution)

def start():
	# Allow the camera to adjust to lighting/white balance
	sleep(2)
	
	addAnnotation()

	# Add callbacks to call when motion is detected
	Motion.onMotion(takePicture)
	Motion.onMotion(startRecording)
	Motion.onMotionEnd(stopRecording)

	# Start capturing frames
	for f in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
		Motion.checkForMotion(f.array)
		# Clear the stream in preparation for the next frame
		rawCapture.truncate(0)

def stop():
	camera.stop()

def addAnnotation():
	def addTimestamp():
		global camera
	
		# Show timestamp
		while True:
			camera.annotate_text = datetime.now().strftime('%A %d %B %Y %H:%M:%S')
			camera.wait_recording(0.5)

	threading.Thread(target=addTimestamp).start()

def takePicture(time):
	dirname = os.path.join(os.path.dirname(__file__), 'out/')
	filename = getFilenameFromTime(time, '.jpg')

	# Take picture
	camera.capture(dirname + filename)

	# Upload photo
	Storage.uploadFile('out/' + filename, 'photos/' + filename)
	Firestore.addFileToDocument(filename, 'photos', time)

def startRecording(time):
	dirname = os.path.join(os.path.dirname(__file__), 'out/')
	filename = getFilenameFromTime(time)

	camera.start_recording(dirname + filename + '.h264')

def stopRecording(time):
	global camera

	if (not camera.recording):
		return
	camera.stop_recording()

	# Convert h264 to mp4
	filename = getFilenameFromTime(time)
	convert(filename)

	# Upload video
	Storage.uploadFile('out/' + filename + '.mp4', 'videos/' + filename + '.mp4')
	Firestore.addFileToDocument(filename + '.mp4', 'videos', time)

def convert(filename) :
	# Convert the h264 format to the mp4 format
	command = 'MP4Box -add ' + 'out/' + filename + '.h264 out/' + filename + '.mp4'
	subprocess.call([command], shell=True)
	os.remove('out/' + filename + '.h264')

def getFilenameFromTime(time, ext=''):
	return time.strftime('%Y%m%dT%H%M%S') + ext