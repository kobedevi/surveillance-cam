import LogoutButton from '../Auth/LogoutButton';
import useSettings from '../../../core/hooks/queries/useSettings';
import { Alert, Spinner, Title } from '../../Design';

const Settings = () => {
  const { data: settings, ...query } = useSettings();

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  return (
    <>
      <Title>Settings</Title>

      <Alert>This is an example alert</Alert>

      <ul>
        {Object.entries(settings).map(([key, value]) => (
          <li key={key}>
            {key}: {value.toString()}
          </li>
        ))}
      </ul>

      <LogoutButton />
    </>
  );
};

export default Settings;
