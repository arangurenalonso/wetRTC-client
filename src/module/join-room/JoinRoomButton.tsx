import './JoinRoomPage.css';
type JoinRoomButtonProps = {
  buttonText: string;
  cancelButton?: boolean;
  onClick: () => void;
};
const JoinRoomButton = ({
  buttonText,
  cancelButton = false,
  onClick,
}: JoinRoomButtonProps) => {
  const buttonClass = cancelButton
    ? 'join_room_cancel_button'
    : 'join_room_success_button';

  return (
    <button onClick={onClick} className={buttonClass}>
      {buttonText}
    </button>
  );
};
export default JoinRoomButton;
