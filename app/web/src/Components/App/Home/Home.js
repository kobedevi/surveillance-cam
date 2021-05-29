import { useState } from 'react';
import { useSettings, postSettings } from '../../../hooks/queries/useSettings';
import { Alert, Spinner, Title } from '../../Design';
import PowerButton from '../PowerButton';

const Home = () => {

  const { data: settings, ...query } = useSettings();

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  return (
      <div className="center-container">
        <Title>Home</Title>
        <PowerButton value={settings.running}/>
      </div>
  );
};

export default Home;
