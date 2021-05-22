import firebase from 'firebase/app';
import useRegistrationToken from './hooks/useRegistrationToken';

const App = () => {
  const { token, error } = useRegistrationToken();

  const firebaseApp = firebase.apps[0];

  return (
    <>
      <h1>Dashboard</h1>

      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>

      {token && <p>{token}</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default App;
