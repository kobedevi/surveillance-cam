import firebase from 'firebase/app';
import { FaSignOutAlt } from 'react-icons/fa';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import Navbar from '../Design/Navbar/Navbar';

const App = () => {
  const { token, error } = useRegistrationToken();

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Navbar />

      <button onClick={logOut}>Uitloggen</button>

      <code>
        <pre>{JSON.stringify(firebase.apps[0].options, null, 2)}</pre>
      </code>
      {/** 
      {token && <p>{token}</p>}
      {error && <p>{error}</p>}
      */}
    </>
  );
};

export default App;
