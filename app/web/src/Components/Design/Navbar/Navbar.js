import { Link } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import { IoMdHome, IoIosSettings } from 'react-icons/io';
import { Routes } from '../../../core/routing';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={Routes.Settings}>
        <IoIosSettings />
      </Link>
      <Link to={Routes.Home} className="active">
        <IoMdHome />
      </Link>
      <Link to={Routes.Timeline}>
        <FaVideo />
      </Link>
    </nav>
  );
};

export default Navbar;
