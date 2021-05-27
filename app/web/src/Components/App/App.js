import firebase from 'firebase/app';
import { FaSignOutAlt } from 'react-icons/fa';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import LogoutButton from '../Design/Buttons/LogoutButton';
import Navbar from '../Design/Navbar/Navbar';
import { IoIosSettings } from 'react-icons/io';

const App = () => {
  const { token, error } = useRegistrationToken();

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Navbar />

      <LogoutButton />

      <code>
        <pre>{JSON.stringify(firebase.apps[0].options, null, 2)}</pre>
      </code>
      {token && <p>{token}</p>}
      {error && <p>{error?.message ?? error}</p>}
    </>
  );
};

export default App;
