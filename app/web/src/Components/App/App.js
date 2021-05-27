import firebase from 'firebase/app';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import Navbar from '../Design/Navbar/Navbar';
import MainRouting from './MainRouting';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const { token, error } = useRegistrationToken();

  return (
    <>
      <main>
        <code>
          <pre>{JSON.stringify(firebase.apps[0].options, null, 2)}</pre>
        </code>
        <MainRouting/>
      </main>
      <Navbar />

      {token && <p>{token}</p>}
      {error && <p>{error?.message ?? error}</p>}
    </>
  );
};

export default App;
