import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import { Routes } from '../../../core/routing/index';
import { Spinner } from '../../Design';
import Login from './Login';

const AuthContainer = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user ?? null);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <Switch>
        <Route path={Routes.Login}>
          <Login />
        </Route>
        <Redirect to={Routes.Login} />
      </Switch>
    );
  }

  return children;
};

export default AuthContainer;
