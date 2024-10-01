import '../RoomPage.css';
import Participants from './Participants';
import ParticipantsLabel from './ParticipantsLabel';

type ParticipantsSectionProps = {};

const ParticipantsSection = ({}: ParticipantsSectionProps) => {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
    </div>
  );
};

export default ParticipantsSection;
