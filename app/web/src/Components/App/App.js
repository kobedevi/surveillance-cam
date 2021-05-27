import { QueryClient, QueryClientProvider } from 'react-query';
import firebase from 'firebase/app';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import LogoutButton from './Auth/LogoutButton';
import Navbar from '../Design/Navbar/Navbar';
import MainRouting from './MainRouting';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = () => {
  useRegistrationToken();

  return (
    <>
      <main>
        {/* <code>
          <pre>{JSON.stringify(firebase.apps[0].options, null, 2)}</pre>
        </code> */}
        <MainRouting/>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </main>
      <Navbar />
    </>
  );
};

export default App;
