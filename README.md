# Werkstuk Examen IoT

## Team

Kobe Devillé  
Dante Weverbergh  
Jonas Di Dier

## Hoe camera installeren
Verdere instructies: https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/2
 - Verbind camera met pi
 - Go naar het hoofdmenu > Preferences > Raspberr Pi Configuration
 - Selecteer de interfaces tab en zet de Camera optie op enabled 
 - Herstart de pi

## Installeer de volgende dependencies
  ```
  pip install firebase -U
  pip install firebase-admin -U
  pip install google-cloud-storage -U

  pip3 install opencv-python
  sudo apt-get install libcblas-dev
  sudo apt-get install libhdf5-dev
  sudo apt-get install libhdf5-serial-dev
  sudo apt-get install libatlas-base-dev
  sudo apt-get install libjasper-dev
  sudo apt-get install libqtgui4
  sudo apt-get install libqt4-test
  sudo apt install -y gpac
  ```

## Pi starten
 - **App moet uit deze folder gestart worden**
   - navigeer naar app/pi/src
   - run ``` python3 main.py ```

## App starten

  - Ga naar volgende link op mobile: https://iot-werkstuk.web.app/
  - Installeer als PWA

## App login
**Email:**  
```
user@iot.com
```
**Password:**  
```
password
```