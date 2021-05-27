import React from 'react';
import ReactDOM from 'react-dom';
import './services/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContainer from './Components/App/Auth/AuthContainer'
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContainer/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);