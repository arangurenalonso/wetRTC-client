import useRoomStore from '../../hooks/useRoomStore';
import './JoinRoomPage.css';
type OnlyWithAudioCheckboxProps = {};
const OnlyWithAudioCheckbox = ({}: OnlyWithAudioCheckboxProps) => {
  const { connectOnlyWithAudio, ontSetConnectOnlyWithAudioProcess } =
    useRoomStore();
  const handleConnectionTypeChange = () => {
    ontSetConnectOnlyWithAudioProcess(!connectOnlyWithAudio);
  };
  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio ? (
          <img className="checkbox_image" src="/public/check.png" alt="check" />
        ) : null}
      </div>
      <p className="checkbox_container_paragraph">Only with audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
