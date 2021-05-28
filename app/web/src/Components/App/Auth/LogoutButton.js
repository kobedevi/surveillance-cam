import { useAuth } from '../Auth/AuthContainer';
import '../../Design/Buttons/Button.scss';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button className="LogoutButton" onClick={logout}>
      Uitloggen
    </button>
  );
};

export default LogoutButton;
