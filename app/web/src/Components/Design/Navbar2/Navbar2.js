import './Navbar2.scss';
import { FaVideo, FaSave } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { IoIosSettings } from 'react-icons/io';

const Navbar2 = () => {
  return (
    <>
      <div class="phone">
        <input type="radio" name="radio" id="input_1" />
        <input type="radio" name="radio" id="input_2" checked="checked" />
        <input type="radio" name="radio" id="input_3" />

        <label for="input_1">
          <i class="fa fa-user">
            <FaSave />
          </i>
        </label>
        <label for="input_2">
          <i class="fa fa-home">
            <IoMdHome />
          </i>
        </label>
        <label for="input_3">
          <FaVideo className="fa fa-map-marker" />
        </label>

        <div class="circle"></div>

        <div class="phone_content">
          <div class="phone_bottom">
            <span class="indicator"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
