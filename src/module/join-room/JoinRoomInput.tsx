type JoinRoomInputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const JoinRoomInput = ({
  placeholder,
  value,
  onChange,
}: JoinRoomInputProps) => {
  return (
    <input
      className="join_room_input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default JoinRoomInput;
