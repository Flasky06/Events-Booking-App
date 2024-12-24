const Button = ({ type, children, className }) => {
  return (
    <button
      type={type}
      className={`w-full py-2 text-white rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
