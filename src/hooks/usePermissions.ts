import { useState, useEffect } from 'react';

const usePermission = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null
  );

  const requestMediaDevices = async (): Promise<MediaStream | undefined> => {
    setLoading(true);

    try {
      const localStreamResult = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 480 },
          height: { ideal: 360 },
        },
        audio: true,
      });
      setPermissionGranted(true);
      return localStreamResult;
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('User denied access to camera or microphone.');
        } else {
          setError('Error accessing camera or microphone: ' + err.message);
        }
      } else {
        setError('Unknown error occurred.');
      }
      setPermissionGranted(false);
    } finally {
      setLoading(false);
    }
  };

  const getLocalStream = async (): Promise<MediaStream | undefined> => {
    const localStreamResult = await requestMediaDevices();
    return localStreamResult;
  };

  return {
    permissionGranted,
    error,
    loading,
    getLocalStream,
  };
};

export default usePermission;
