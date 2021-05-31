const Alert = ({ children, color="" }) => {
  return (
    <div className={`alert ${color}`} role="alert">
      {children}
    </div>
  );
};

export default Alert;
