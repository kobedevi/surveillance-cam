import { Link, useLocation } from 'react-router-dom';
import { IoMdOptions, IoMdVideocam } from 'react-icons/io';
import { BsFillCollectionPlayFill } from 'react-icons/bs';
import { Routes } from '../../../core/routing';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link
        to={Routes.Settings}
        className={pathname.includes(Routes.Settings) ? 'active' : ''}
      >
        <IoMdOptions />
      </Link>
      <Link
        to={Routes.Home}
        className={pathname.includes(Routes.Home) ? 'active' : ''}
      >
        <IoMdVideocam />
      </Link>
      <Link
        to={Routes.Timeline}
        className={pathname.includes(Routes.Timeline) ? 'active' : ''}
      >
        <BsFillCollectionPlayFill />
      </Link>
    </nav>
  );
};

export default Navbar;
