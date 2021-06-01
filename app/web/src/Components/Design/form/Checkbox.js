const Checkbox = ({ name, label, checked, onChange }) => {
  return (
    <div className="form-input form-input--checkbox">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
