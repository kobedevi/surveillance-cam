import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/messaging';
import './index.css';
import App from './App';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyABANFCpUeQ9dI36d_5KVsSq_rxPVnc-Fc',
  authDomain: 'iot-werkstuk.firebaseapp.com',
  projectId: 'iot-werkstuk',
  storageBucket: 'iot-werkstuk.appspot.com',
  messagingSenderId: '420748414808',
  appId: '1:420748414808:web:4cf1a8447ee5f5fba31f2d',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
