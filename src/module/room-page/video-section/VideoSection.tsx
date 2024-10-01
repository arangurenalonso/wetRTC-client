import '../RoomPage.css';
import VideoButtons from './VideoButtons';
import VideoPortal from './VideoPortal';

type VideoSectionProps = {};

const VideoSection = ({}: VideoSectionProps) => {
  return (
    <div className="video_section_container">
      <VideoPortal />
      <VideoButtons />
    </div>
  );
};

export default VideoSection;
