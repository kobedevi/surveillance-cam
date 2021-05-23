import firebase from 'firebase/app';
import useRegistrationToken from '../../hooks/useRegistrationToken';

const App = () => {
  const { token, error } = useRegistrationToken();

  return (
    <>
      <h1>Dashboard</h1>

      <code>
        <pre>{JSON.stringify(firebase.apps[0].options, null, 2)}</pre>
      </code>

      {token && <p>{token}</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default App;
