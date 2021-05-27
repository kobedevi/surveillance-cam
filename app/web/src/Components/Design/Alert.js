
const Alert = ({ children, color = "primary" }) => {
    return (
        <div className={`alert alert-${color}`} role="alert">
            { children }
        </div>
    )
};

export default Alert;
