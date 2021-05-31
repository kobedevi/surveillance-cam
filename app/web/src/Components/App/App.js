import { QueryClient, QueryClientProvider } from 'react-query';
import useRegistrationToken from '../../core/hooks/useRegistrationToken';
import Navbar from './Navbar/Navbar';
import MainRouting from './MainRouting';

const queryClient = new QueryClient();

const App = () => {
  useRegistrationToken();

  return (
    <>
      <main>
        <QueryClientProvider client={queryClient}>
          <MainRouting />
        </QueryClientProvider>
      </main>
      <Navbar />
    </>
  );
};

export default App;
