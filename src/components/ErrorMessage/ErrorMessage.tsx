interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>
      <b>{message}</b>
    </div>
  );
};

export default ErrorMessage;
