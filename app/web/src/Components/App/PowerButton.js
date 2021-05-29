import { useState } from 'react';
import { IoMdPower } from 'react-icons/io';
import { postSettings } from '../../hooks/queries/useSettings';

const PowerButton = ({value}) => {

    const [running, setRunning] = useState(value)
    const [label, setLabel] = useState()
    
    const handleChange = async() => {
        postSettings(!running);
        setRunning(!running);
    }

    return (
        <div className='centerButton'>
            <label className="cb-container">
                <p>{ running ? 'On' : 'Off' }</p>
                <input type="checkbox" className='power' onChange={handleChange} checked={running} />
                <span className="checkmark">
                    <IoMdPower />
                </span>
            </label>
        </div>
    );
  };
  
  export default PowerButton;
  