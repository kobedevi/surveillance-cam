import LogoutButton from '../Auth/LogoutButton';
import useSettings from '../../../hooks/queries/useSettings';
import Spinner from '../../Design/Spinner/Spinner';
import Alert from '../../Design/Alert';

const Settings = () => {
  const { data: settings, ...query } = useSettings();

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  console.log(settings);

  return (
    <>
      <h1>Settings</h1>

      <dl>
        {Object.entries(settings).map(([key, value]) => (
          <>
            <dt>{key}</dt>
            <dd>{value.toString()}</dd>
          </>
        ))}
      </dl>

      <LogoutButton />
    </>
  );
};

export default Settings;
