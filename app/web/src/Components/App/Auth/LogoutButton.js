import { useAuth } from '../Auth/AuthContainer';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button className="LogoutButton" onClick={logout}>
      Uitloggen
    </button>
  );
};

export default LogoutButton;
