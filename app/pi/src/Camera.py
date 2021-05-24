import time
import datetime
import subprocess
import os
from Firebase import Firestore
from Firebase import Storage

def takePicture(camera, dirname, time):
	filename = time.strftime('%Y%m%dT%H%M%S') + '.jpg'

	# Take picture
	camera.capture(dirname + filename)

	# Upload photo
	Storage.uploadFile('out/' + filename, 'photos/' + filename)
	Firestore.addFileToDocument(filename, 'photos', time)

# Using picamera since it's easier to record on
def startRecording(camera, dirname, time):
	filename = time.strftime('%Y%m%dT%H%M%S')

	# Start recording
	camera.start_recording(dirname + filename + '.h264')

	start = datetime.datetime.now()
	camera.annotate_text_size = 15 # TODO: Move to Motion.py (under camera.rotation etc)?

	# While loop to update video annotation
	while (datetime.datetime.now() - start).seconds < 5:
		camera.annotate_text = datetime.datetime.now().strftime('%A %d %B %Y %H:%M:%S')
		camera.wait_recording(0.2)

	# Stop recording
	camera.stop_recording()
	camera.annotate_text = ''
	
	# Convert h264 to mp4
	convert(filename)

	# Upload video
	Storage.uploadFile('out/' + str(filename) + '.mp4', 'videos/' + str(filename) + '.mp4')
	Firestore.addFileToDocument(filename, 'videos', time)

	return False

def convert(filename) :
	# Convert the h264 format to the mp4 format
	command = 'MP4Box -add ' + 'out/' + filename + '.h264 out/' + filename + '.mp4'
	subprocess.call([command], shell=True)
	os.remove('out/' + filename + '.h264')

def isRecording():
  	pass