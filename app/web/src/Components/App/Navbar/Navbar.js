import { Link, useLocation } from 'react-router-dom';
import { IoMdHome, IoMdSettings, IoMdVideocam } from 'react-icons/io';
import { Routes } from '../../../core/routing';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link
        to={Routes.Settings}
        className={pathname.includes(Routes.Settings) ? 'active' : ''}
      >
        <IoMdSettings />
      </Link>
      <Link
        to={Routes.Home}
        className={pathname.includes(Routes.Home) ? 'active' : ''}
      >
        <IoMdHome />
      </Link>
      <Link
        to={Routes.Timeline}
        className={pathname.includes(Routes.Timeline) ? 'active' : ''}
      >
        <IoMdVideocam />
      </Link>
    </nav>
  );
};

export default Navbar;
