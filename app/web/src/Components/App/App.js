import firebase from 'firebase/app';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import Navbar from '../Design/Navbar/Navbar';

const App = () => {
  const { token, error } = useRegistrationToken();

  return (
    <>
      <Navbar />

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
