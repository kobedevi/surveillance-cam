import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import './services/firebase';
import './index.scss';
import App from './Components/App/App';
import Login from './Components/App/Auth/Login';
import Spinner from './Components/Design/Spinner/Spinner';

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>{user ? <App /> : <Login />}</React.StrictMode>,
    document.getElementById('root')
  );
});

ReactDOM.render(<Spinner />, document.getElementById('root'));
