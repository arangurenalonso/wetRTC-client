import './IntroductionPage.css';

type ConnectingButtonProps = {
  isRoomCreated?: boolean;
  buttonText: string;
  onClick: () => void;
};
const ConnectingButton = ({
  isRoomCreated: createRoomButton = false,
  buttonText,
  onClick,
}: ConnectingButtonProps) => {
  const buttonClass = createRoomButton
    ? 'create_room_button'
    : 'join_room_button';

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ConnectingButton;
