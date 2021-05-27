import './Navbar.scss';
import { Link } from 'react-router-dom';
import { FaVideo, FaSave } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { IoIosSettings } from 'react-icons/io';
import { Routes } from '../../../core/routing';

const Navbar = () => {
  return (
    <>
      <div className="settings">
        <Link to={Routes.Settings}>
          <IoIosSettings />
        </Link>
      </div>

      <div className="navbar">
        <Link to={Routes.Home} className="active">
          <IoMdHome />
        </Link>
        <Link to={Routes.Timeline}>
          <FaVideo />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
