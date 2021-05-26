import './Button.scss';
import { FaSave } from 'react-icons/fa';

const ButtonSave = ({ children, onclic, type }) => {
  return (
    <div>
      <button classname="buttonSave btnSmall" onclick={onclick} type={type}>
        <FaSave />
      </button>
    </div>
  );
};

export default ButtonSave;
