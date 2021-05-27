import { QueryClient, QueryClientProvider } from 'react-query';
import useRegistrationToken from '../../hooks/useRegistrationToken';
import LogoutButton from '../Design/Buttons/LogoutButton';
import Navbar from '../Design/Navbar/Navbar';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = () => {
  useRegistrationToken();

  return (
    <QueryClientProvider client={queryClient}>
      <LogoutButton />
      <Navbar />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
