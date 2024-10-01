import JoinRoomInput from './JoinRoomInput';
import './JoinRoomPage.css';
type JoinRoomInputsProps = {
  roomIdValue: string;
  setRoomIdValue: (value: string) => void;
  nameValue: string;
  setNameValue: (value: string) => void;
  isRoomHost: boolean;
};
const JoinRoomInputs = ({
  roomIdValue,
  setRoomIdValue,
  nameValue,
  setNameValue,
  isRoomHost,
}: JoinRoomInputsProps) => {
  const handleRoomIdValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomIdValue(e.target.value);
  };
  const handleNameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  return (
    <div className="join_room_inputs_container">
      <JoinRoomInput
        placeholder="Enter your name"
        value={nameValue}
        onChange={handleNameValueChange}
      />
      {!isRoomHost && (
        <JoinRoomInput
          placeholder="Enter meeting ID"
          value={roomIdValue}
          onChange={handleRoomIdValueChange}
        />
      )}
    </div>
  );
};

export default JoinRoomInputs;
