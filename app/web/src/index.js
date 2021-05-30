import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './core/services/firebase';
import AuthContainer from './Components/App/Auth/AuthContainer';
import App from './Components/App/App';
import './scss/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContainer>
        <App />
      </AuthContainer>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
