import "./Button.scss";

const Button = ({ children, onClick, enabled, className, ...rest }) => {
  return (
    <button
      className={` ${className} Button ${enabled ? "enabled" : ""}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
