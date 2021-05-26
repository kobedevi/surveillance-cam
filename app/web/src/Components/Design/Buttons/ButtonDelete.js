import './Button.scss';
import { mdDelete } from 'react-icons/md';

function ButtonDelete() {
  return (
    <div>
      <button classname="buttonSave btnSmall">
        <mdDelete />
      </button>
    </div>
  );
}

export default ButtonDelete;
