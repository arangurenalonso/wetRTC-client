import '../RoomPage.css';
import SingleParticipant from './SingleParticipant';
import useRoomStore from '../../../hooks/useRoomStore';

type ParticipantsProps = {};

const Participants = ({}: ParticipantsProps) => {
  const { participantsOfRoom } = useRoomStore();

  return (
    <div className="participants_container">
      {participantsOfRoom?.map((participant, index) => (
        <SingleParticipant
          key={participant.id}
          identity={participant.name}
          isLast={participantsOfRoom?.length - 1 === index}
        />
      ))}
    </div>
  );
};

export default Participants;
