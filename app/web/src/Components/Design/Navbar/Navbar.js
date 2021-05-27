import './Navbar.scss';
import { FaVideo, FaSave } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { IoIosSettings } from 'react-icons/io';

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <a href="/saved" className="">
          <FaSave />
        </a>
        <a href="/home" className="active">
          <IoMdHome />
        </a>
        <a href="/Timeline">
          <FaVideo />
        </a>
      </div>
    </>
  );
};

export default Navbar;
