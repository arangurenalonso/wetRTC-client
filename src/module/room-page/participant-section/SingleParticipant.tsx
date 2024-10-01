import '../RoomPage.css';

type SingleParticipantProps = {
  identity: string;
  isLast: boolean;
};

const SingleParticipant = ({ identity, isLast }: SingleParticipantProps) => {
  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!isLast && <span className="participants_separator_line"></span>}
    </>
  );
};

export default SingleParticipant;
