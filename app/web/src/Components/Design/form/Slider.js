const Slider = ({
  name,
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  info = '',
}) => {
  return (
    <div className="form-input form-input--range">
      <label htmlFor={name}>{label}</label>
      <output htmlFor={name}>{value}</output>
      <input
        type="range"
        name={name}
        id={name}
        value={value}
        min={+min}
        max={+max}
        step={+step}
        onChange={onChange}
      />
      <p>
        <small>{info}</small>
      </p>
    </div>
  );
};

export default Slider;
