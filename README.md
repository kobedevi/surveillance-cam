# Surveillance camera

This project consists of a security camera that will send a push notification with a picture when motion is detected. After detecting motion, a recording will be made and uploaded to Firebase. The dashboard can be used to enable/disable the camera, view the timeline of recordings, and change the settings.

_WIP: Mention led and buzzer_

**Team:** Kobe Devillé, Jonas Di Dier, Dante Weverbergh

## Screenshots

_WIP: Add more and final screenshot_
_TIP: Write images on same line to place them side by side_

![localhost-3000-timeline-Moto-G4.png](https://i.postimg.cc/Y2Ywymcm/localhost-3000-timeline-Moto-G4.png)

## Installation

### Required hardware

- [x] Raspberry pi
- [x] Camera module
- [x] Led light
- [x] Buzzer
- [x] Jumper cables and a resistor
- [x] Breadboard (optional)

### Camera

- Connect the camera with your Raspberry Pi
- Enable the camera
  - GUI: Menu > Preferences > Raspberry Pi Configuration > Interfaces
  - CLI: `sudo raspi-config` > Interfacing Options
- Reboot

### Led and buzzer

_WIP: Led and buzzer setup guide_

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

pip3 install opencv-python
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
