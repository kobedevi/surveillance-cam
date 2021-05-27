import './Button.scss';
import firebase from 'firebase/app';

const LogoutButton = () => {
  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <button className="LogoutButton" onClick={logOut}>
        Uitloggen
      </button>
    </>
  );
};

export default LogoutButton;
