import { createContext, useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import '../../../services/firebase';
import { Routes } from '../../../core/routing/index';
import { Spinner } from '../../Design';
import App from '../App';
import Login from './Login';

const AuthContext = createContext();

const AuthContainer = () => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
      setPending(false);
    });
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const logout = () => {
    firebase.auth().signOut();
    setUser(null);
  };

  if (pending) {
    return <Spinner />;
  }

  if (user) {
    return (
      <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
        <App />
      </AuthContext.Provider>
    );
  }

  return (
    <Switch>
      <Route path={Routes.Login}>
        <Login setUser={updateUser} />
      </Route>
      <Redirect to={Routes.Login} />
    </Switch>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export default AuthContainer;
