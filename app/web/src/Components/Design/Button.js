const COLORS = ['primary', 'secondary', 'muted'];
const SIZES = ['sm', 'lg'];

const Button = ({
  children,
  onClick,
  color = 'primary',
  size = 'sm',
  type = 'button',
  className = '',
}) => {
  const btnColor = COLORS.includes(color) ? color : COLORS[0];
  const btnSize = SIZES.includes(color) ? size : SIZES[0];

  return (
    <button
      className={`btn btn--${btnColor} btn--${btnSize} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
