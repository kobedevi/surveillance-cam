import './Spinner.css';

const Spinner = () => {
  return (
    <div className="overlay">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Spinner;
