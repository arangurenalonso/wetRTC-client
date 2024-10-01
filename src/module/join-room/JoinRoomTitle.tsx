import './JoinRoomPage.css';
type JoinRoomTitleProps = {
  isRoomHost: boolean;
};
const JoinRoomTitle = ({ isRoomHost }: JoinRoomTitleProps) => {
  const titleText = isRoomHost ? 'Host meeting' : 'Join meeting';
  return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;
