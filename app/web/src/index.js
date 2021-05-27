import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import './services/firebase';
import './index.scss';
import App from './Components/App/App';
import Login from './Components/App/Auth/Login';
import Spinner from './Components/Design/Spinner/Spinner';
import { BrowserRouter as Router } from 'react-router-dom';

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>{user ? <App /> : <Login />}</Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

ReactDOM.render(<Spinner />, document.getElementById('root'));
