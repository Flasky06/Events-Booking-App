const ErrorMessage = ({ message }) => {
  return message ? (
    <p className="text-red-500 text-sm text-center mb-4">{message}</p>
  ) : null;
};

export default ErrorMessage;
