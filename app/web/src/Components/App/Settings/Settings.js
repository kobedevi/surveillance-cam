import LogoutButton from '../Auth/LogoutButton';
import useSettings from '../../../core/hooks/queries/useSettings';
import { Alert, Spinner, Title } from '../../Design';
import SettingsForm from './SettingsForm';

const Settings = () => {
  const { data: settings, ...query } = useSettings();

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  // Get all editable fields
  const { running, registrationTokens, ...formData } = settings;

  return (
    <section className="settings">
      <Title>Settings</Title>

      <LogoutButton />

      <SettingsForm settings={formData} />
    </section>
  );
};

export default Settings;
