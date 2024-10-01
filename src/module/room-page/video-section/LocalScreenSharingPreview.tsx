import { useEffect, useRef } from 'react';

type LocalScreenSharingPreviewProps = {
  stream: MediaStream;
};
const LocalScreenSharingPreview = ({
  stream,
}: LocalScreenSharingPreviewProps) => {
  const screamLocalPreviewRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (screamLocalPreviewRef.current) {
      screamLocalPreviewRef.current.srcObject = stream;
      screamLocalPreviewRef.current.onloadedmetadata = () => {
        screamLocalPreviewRef.current?.play();
      };
    }
  }, [stream]);
  return (
    <div className="local_screen_share_preview">
      <video ref={screamLocalPreviewRef} autoPlay muted />
    </div>
  );
};

export default LocalScreenSharingPreview;
