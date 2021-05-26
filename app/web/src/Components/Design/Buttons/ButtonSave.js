import './Button.scss';
import { FaSave } from 'react-icons/fa';

function ButtonSave() {
  return (
    <div>
      <button classname="ButtonSave BtnSmall">
        <FaSave />
      </button>
    </div>
  );
}

export default ButtonSave;
