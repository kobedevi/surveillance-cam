# Werkstuk Examen IoT

## Team

Kobe Devillé  
Dante Weverbergh  
Jonas Di Dier

## Motion detection
- pip install opencv-python or pip install opencv-contrib-python
- sudo apt install -y gpac

## possible errors:
- **Error:** ImportError: libcblas.so.3: cannot open shared object file: No such file or directory  
**Solution:**  
  ```
  pip3 install opencv-python 
  sudo apt-get install libcblas-dev
  sudo apt-get install libhdf5-dev
  sudo apt-get install libhdf5-serial-dev
  sudo apt-get install libatlas-base-dev
  sudo apt-get install libjasper-dev 
  sudo apt-get install libqtgui4 
  sudo apt-get install libqt4-test
  ```
