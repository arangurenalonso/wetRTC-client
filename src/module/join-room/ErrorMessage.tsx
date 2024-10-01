import './JoinRoomPage.css';

type ErrorMessageProps = {
  errorMessage?: string;
};

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="error_message_container">
      {errorMessage && (
        <p className="error_message_paragraph">{errorMessage}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
