import { IoMdPower } from 'react-icons/io';
import useSettings from '../../../core/hooks/queries/useSettings';
import useUpdateSettings from '../../../core/hooks/mutations/useUpdateSettings';
import { Alert, Button, Spinner, Title } from '../../Design';

const Home = () => {
  const { data: settings, ...query } = useSettings();
  const mutation = useUpdateSettings();

  const togglePower = () => {
    mutation.mutate({ running: !settings.running });
  };

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  return (
    <section className="home">
      <Title>Camera</Title>
      <section className="power-button">
        <Button
          value={settings.running}
          onClick={togglePower}
          className={settings.running ? 'active' : false}
          disabled={mutation.isLoading}
        >
          <IoMdPower />
        </Button>
        <p>{settings.running ? 'On' : 'Off'}</p>
      </section>
    </section>
  );
};

export default Home;
