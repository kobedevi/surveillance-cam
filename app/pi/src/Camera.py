import time
import datetime
import subprocess
import os
from Firebase import Storage

def takePicture(camera, dirname, filename):
	camera.capture(dirname + filename +'.jpg')
	# upload photo
	Storage.uploadFile('out/' + str(filename) + ".jpg", "photos/" + str(filename) + ".jpg")

# using picamera since it's easier to record on
def startRecording(camera, dirname, filename):
	camera.start_recording(dirname + filename + '.h264')
	# start time
	start = datetime.datetime.now()
	camera.annotate_text_size = 15
	# while loop to update video annotation
	while (datetime.datetime.now() - start).seconds < 5:
		camera.annotate_text = datetime.datetime.now().strftime('%A %d %B %Y %I:%M:%S%p')
		camera.wait_recording(0.2)
	camera.stop_recording()
	camera.annotate_text = ""
	convert(filename)
	return False

def convert(filename) :
	# Convert the h264 format to the mp4 format
	command = "MP4Box -add " + "out/" + str(filename) + ".h264 out/" + str(filename) + ".mp4"
	subprocess.call([command], shell=True)
	os.remove("out/" + filename + ".h264")
	# upload video
	Storage.uploadFile('out/' + str(filename) + ".mp4", "videos/" + str(filename) + ".mp4")

def isRecording():
  	pass