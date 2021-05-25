# Werkstuk Examen IoT

## Motion detection camera met dashboard
We gebruiken een camera verbonden met de pi, de pi zal beginnen opnemen zodra er beweging wordt opgemerkt.
Deze video wordt dan opgeslagen in firebase en de gebruiker krijgt een notificatie op de app.
Op de app kan de gebruiker de beelden herbekijken en het alarm in/uit schakelen

## Team
Kobe Devillé  
Dante Weverbergh  
Jonas Di Dier

## Hoe camera installeren
Verdere instructies: https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/2
 - Verbind camera ![How to install camera](https://projects-static.raspberrypi.org/projects/getting-started-with-picamera/e700e884354667bc3db3dddc19e20931a787c9a7/en/images/connect-camera.gif)
 - Go naar het hoofdmenu > Preferences > Raspberr Pi Configuration
 - Selecteer de interfaces tab en zet de Camera optie op enabled 
 - Herstart de pi

## Run volgende commands
```
pip3 install opencv-python -U

pip install firebase -U

pip install firebase-admin -U

sudo apt-get install libcblas-dev
sudo apt-get install libhdf5-dev 
sudo apt-get install libhdf5-serial-dev 
sudo apt-get install libatlas-base-dev
sudo apt-get install libjasper-dev
sudo apt-get install libqtgui4
sudo apt-get install libqt4-test -y

sudo apt-get install -y gpac
```