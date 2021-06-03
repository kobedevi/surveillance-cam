# Surveillance camera

This project consists of a security camera that will send a push notification with a picture when motion is detected. After detecting motion, a recording will be made and uploaded to Firebase. The dashboard can be used to enable/disable the camera, view the timeline of recordings, and change the settings. LEDs can be connected to indicate the state of the camera and recording.

**Team:** Kobe Devillé, Jonas Di Dier, Dante Weverbergh

## Screenshots

![Home.png](https://i.postimg.cc/MG4xdbMj/Home.png) ![Timeline.png](https://i.postimg.cc/8cgGVpbp/Timeline.png) ![Timeline-Detail.png](https://i.postimg.cc/yNWsmrdH/Timeline-Detail.png) ![Settings.png](https://i.postimg.cc/k4bCZ6KY/Settings.png)

## Videos
  - Project overview: _WIP_
  - Technische uitleg: https://youtu.be/z5Ts6NQ8LjI

## Demo of live application
_WIP : update link to firebase installation, add firebaseKey somewhere_
  - Follow the installation guide below, but at the [Firebase](#Dashboard) step use our provided `serviceAccountKey.json` file instead.
    - At the [Dashboard](#Dashboard) step go to https://iot-werkstuk.web.app instead of your own hosted site and use the following credentials
      - Email: `user@iot.com`
      - Password: `password`
  
## Installation

### Required hardware

- [x] Raspberry Pi
- [x] Camera module
- [x] 2 LEDs and resistors
- [x] Jumper cables and breadboard (optional)

### Camera

- Connect the camera with your Raspberry Pi
- Enable the camera
  - GUI: Menu > Preferences > Raspberry Pi Configuration > Interfaces
  - CLI: `sudo raspi-config` > Interfacing Options
- Reboot

### LED

- Connect the LEDs to GPIO pin 14 and 22
  - Pin 14 will indicate the state of the camera
  - Pin 22 will indicate whether or not the camera is currently recording

![circuit.png](https://i.postimg.cc/W14bb40S/circuit.png)

### Dependencies

_WIP: Review commands (consistent use of pip/pip3, apt/apt-get; remove useless commands)_

Run these commands to install the necessary dependencies

```
sudo apt-get install libcblas-dev
sudo apt-get install libhdf5-dev
sudo apt-get install libhdf5-serial-dev
sudo apt-get install libatlas-base-dev
sudo apt-get install libjasper-dev
sudo apt-get install libqtgui4
sudo apt-get install libqt4-test
sudo apt install -y gpac

# NOTE: if opencv won't install use pip3

pip install opencv-python
pip install firebase -U
pip install firebase-admin -U
pip install google-cloud-storage -U
```

### Run the program

- Clone this repository to your Raspberry Pi `git clone https://github.com/gdmgent-iot/werkstuk-examen-2021-team-kobe-dante-jonas.git surveillance-camera`
- Add a cron job to automatically delete old files
  - Run `crontab -e` to edit the cron table
  - Write `0 0 * * * python3 /home/pi/surveillance-camera/app/pi/cron.py` (adjust the path if needed)
  - Save and exit
- Run `cd surveillance-camera && python3 app/pi/src/main.py`

### Dashboard

- Visit https://iot-werkstuk.web.app on a mobile device
- Install the application as a PWA (_Add to home screen_)
- Open the application from your home screen and log in with the following credentials
  - Email: `user@iot.com`
  - Password: `password`

## Credits

Icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)
