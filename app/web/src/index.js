import React from 'react';
import ReactDOM from 'react-dom';
import './services/firebase';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContainer from './Components/App/Auth/AuthContainer'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContainer/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);