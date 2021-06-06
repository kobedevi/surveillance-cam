# Surveillance camera

This project consists of a security camera that will send a push notification with a picture when motion is detected. After detecting motion, a recording will be made and uploaded to Firebase. The dashboard can be used to enable/disable the camera, view the timeline of recordings, and change the settings. LEDs can be connected to indicate the state of the camera and recording.

**Team:** Kobe Devillé, Jonas Di Dier, Dante Weverbergh

## Videos

- Project overview [Dutch]: https://youtu.be/blITzTevAjU
- Technical explanation [Dutch]: https://youtu.be/z5Ts6NQ8LjI

## Demo

This project includes a default dashboard connected to our Firebase project for demonstration purposes. If you want to recreate this project, follow the [installation guide](#Installation) below instead to connect your own dashboard.

- Visit https://iot-werkstuk.web.app on a mobile device
- Install the application as a PWA (_Add to home screen_)
- Open the application from your home screen and log in with the following credentials
  - Email: `user@iot.com`
  - Password: `password`

## Screenshots

![Home.png](https://i.postimg.cc/MG4xdbMj/Home.png) ![Timeline.png](https://i.postimg.cc/8cgGVpbp/Timeline.png) ![Timeline-Detail.png](https://i.postimg.cc/yNWsmrdH/Timeline-Detail.png) ![Settings.png](https://i.postimg.cc/k4bCZ6KY/Settings.png)

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

# NOTE: if opencv won't install, use pip3

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

This repository provides a default dashboard for demonstration purposes. If you want to visit this dashboard, use the steps provided [above](#Demo). If you want to recreate this project, follow these instructions to link your own Firebase project.

1. Go to the Firebase console by visiting firebase.google.com and add a new project. (A detailed guide can be found in the [Firebase documentations](https://firebase.google.com/docs/web/setup?sdk_version=v8)).
1. Connect your Raspberry Pi:
   - Go to _Project settings > Service accounts_ and generate a new private key. This will download a json file to your local drive.
   - Copy this file to your Raspberry Pi, inside the folder /app/pi/src/Firebase.
   - Alternatively, copy the content of this file to the provided serviceAccountKey.example.json.
   - Rename the file to serviceAccountKey.json
1. Connect the dashboard:
   - From the Firebase console, add a web app.
   - Provide a nickname and make sure to set up Firebase Hosting.
   - Run the command `npm install -g firebase-hosting` in your terminal.
   - From the root of the web app, run `firebase login`, followed by `firebase init`.
   - Go to _Project settings_ in the console and copy the Firebase configuration object under _General > Your apps > SDK setup and configuration > Config_.
   - Navigate to /src/core/services/firebase.js and replace the object with the one you copied.
1. Configure Cloud Messaging:
   - Inside the Project settings, go to the _Cloud Messaging_ tab and generate a key pair.
   - Copy the key, navigate to /src/core/hooks/useRegistrationToken.js and replace the provided vapidKey with your key.
1. Enable Firestore:
   - Go to _Build > Firestore Database_ and create a new database.
1. Enable Authentication:
   - Go to _Build > Authentication_ and click _Get started_.
   - Enable _Email/Password_ as sign-in provider.
   - Go to the tab _Users_ and add a user. The credentials you provide will be used to login to the dashboard.
1. Build and deploy:
   - Navigate to the root of the web application (/app/web) and run `yarn install`.
   - Run `yarn build`, followed by `firebase deploy`. Your dashboard is now available online.
   - Open the URL on a mobile device and install the application as a PWA (_Add to home screen_).
   - Open the application from your home screen and log in with the account you provided earlier.

## Credits

Icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)
