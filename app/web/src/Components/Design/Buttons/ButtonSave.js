import './Button.scss';
import { FaSave } from 'react-icons/fa';

function ButtonSave() {
  return (
    <div>
      <button classname="buttonSave btnSmall">
        <FaSave />
      </button>
    </div>
  );
}

export default ButtonSave;
