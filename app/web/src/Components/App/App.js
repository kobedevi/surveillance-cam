import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import Navbar from '../Design/Navbar/Navbar';
import MainRouting from './MainRouting';

const queryClient = new QueryClient();

const App = () => {
  useRegistrationToken();

  return (
    <>
      <main>
        <QueryClientProvider client={queryClient}>
          <MainRouting />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </main>
      <Navbar />
    </>
  );
};

export default App;
