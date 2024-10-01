import './RoomPage.css';
type RoomLabelProps = {
  roomId?: string;
};
const RoomLabel = ({ roomId = '' }: RoomLabelProps) => {
  return (
    <div className="room_label">
      <p className="room_label_paragraph">ID: {roomId}</p>
    </div>
  );
};

export default RoomLabel;
