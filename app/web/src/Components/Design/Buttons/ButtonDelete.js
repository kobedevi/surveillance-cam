import './Button.scss';
import { mdDelete } from 'react-icons/md';

const ButtonDelete = ({ children, type, onclick }) => {
  return (
    <div>
      <button classname="buttonSave btnSmall" onclick={onclick} type={type}>
        <mdDelete />
      </button>
    </div>
  );
};

export default ButtonDelete;
