import { ReactNode, useEffect, useRef, useState } from 'react';
import { WebRCTContext } from './webRCTContext';
import Peer, { SignalData } from 'simple-peer';
import useEmitSocket from '../wss/useEmitSocket';
import usePermission from '../../hooks/usePermissions';
import useRoomStore from '../../hooks/useRoomStore';

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302'],
      },
    ],
  };
};
interface WebRCTProviderProps {
  children: ReactNode;
}

export interface PeersMap {
  [key: string]: Peer.Instance;
}
export interface StreamMap {
  [key: string]: {
    isHost: boolean;
    instance: MediaStream;
  };
}

const WebRCTProvider = ({ children }: WebRCTProviderProps) => {
  const [peer, setPeer] = useState<PeersMap>({});
  const [streams, setStreams] = useState<StreamMap>({});
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenSharingStream, setScreenSharingStream] =
    useState<MediaStream | null>(null);

  const [isRoomInitiator, setIsRoomInitiator] = useState<boolean>(false);

  const { signalPeerData } = useEmitSocket();
  const { getLocalStream, loading } = usePermission();
  const { tougleShare } = useRoomStore();
  const localStreamRef = useRef(localStream);
  useEffect(() => {
    console.log('localStream useEffect', localStream);

    localStreamRef.current = localStream;
  }, [localStream]);

  useEffect(() => {
    return () => {
      // Clean up local stream
      setLocalStream((prevLocalStream) => {
        if (prevLocalStream) {
          prevLocalStream.getTracks().forEach((track) => track.stop());
        }
        return null;
      });
      // Clean up screen sharing stream
      setScreenSharingStream((prevScreenSharingStream) => {
        if (prevScreenSharingStream) {
          prevScreenSharingStream.getTracks().forEach((track) => track.stop());
        }
        return null;
      });
      //Clean up peer connection
      setPeer((prevPeers) => {
        Object.values(prevPeers).forEach((p) => p.destroy());
        return {};
      });
      //Clean up streams
      setStreams((prevStreams) => {
        Object.values(prevStreams).forEach((stream) => {
          stream.instance.getTracks().forEach((track) => track.stop());
        });
        return {};
      });
    };
  }, []);

  const handleShareScreen = async (isScreenSharing: boolean) => {
    if (isScreenSharing) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
      } catch (error) {
        console.error('Error accessing screen sharing stream:', error);
      }
      if (stream) {
        setScreenSharingStream(stream);
        // Cambiar el stream en la conexión peer existente
        const screenTrack = stream.getVideoTracks()[0];
        screenTrack.onended = () => {
          console.log('Screen sharing stopped');
          // Aquí puedes detener el stream de la pantalla compartida y volver al stream original
          setScreenSharingStream(null);
          tougleShare();
          if (localStream) {
            Object.values(peer).forEach((peerInstance) => {
              peerInstance.replaceTrack(
                stream.getVideoTracks()[0], // El track de video de la pantalla compartida
                localStream.getVideoTracks()[0], // Volver al track de video original
                localStream
              );
            });
          }
        };

        if (localStream) {
          Object.values(peer).forEach((peerInstance) => {
            peerInstance.replaceTrack(
              localStream?.getVideoTracks()[0], // El track de video anterior
              stream.getVideoTracks()[0], // El track de video de la pantalla compartida
              localStream // Stream original
            );
          });
        }
      }
    } else {
      setScreenSharingStream((prevScreenSharingStream) => {
        if (prevScreenSharingStream) {
          prevScreenSharingStream.getTracks().forEach((track) => track.stop());
        }
        return null;
      });
      if (screenSharingStream && localStream) {
        Object.values(peer).forEach((peerInstance) => {
          peerInstance.replaceTrack(
            screenSharingStream?.getVideoTracks()[0],
            localStream?.getVideoTracks()[0],
            localStream
          );
        });
      }
    }
  };
  const createPeerConnection = async (
    usersSocketId: string,
    isInitiator: boolean
  ) => {
    const localStreamResult =
      localStreamRef.current || (await getLocalStream());
    if (localStreamResult) {
      setLocalStream(localStreamResult);
    }

    const configuration = getConfiguration();
    try {
      const peerInstance = new Peer({
        initiator: isInitiator,
        stream: localStreamResult,
        config: configuration,
      });

      peerInstance.on('signal', (stream) => {
        const signalData = {
          signal: stream,
          peerSocketId: usersSocketId,
        };
        signalPeerData(signalData);
      });

      peerInstance.on('stream', (stream) => {
        setStreams((prevStreams) => ({
          ...prevStreams,
          [usersSocketId]: {
            isHost: false,
            instance: stream,
          },
        }));
      });
      peerInstance.on('error', (err) => {
        console.error('Error in peer connection:', err);
      });

      setPeer((prevPeer) => ({ ...prevPeer, [usersSocketId]: peerInstance }));
    } catch (error) {
      console.log('createNewPeerConnection error', error);
    }
  };
  const signalingData = (data: {
    signal: SignalData;
    peerSocketId: string;
  }) => {
    console.log('handleSignalingData');

    setPeer((prevPeer) => {
      const { signal, peerSocketId } = data;
      const existingPeer = prevPeer[peerSocketId];
      if (existingPeer) {
        existingPeer.signal(signal);
      }
      return { ...prevPeer, [peerSocketId]: existingPeer };
    });
  };
  const removePeerConnection = (socketIdUserDisconnected: string) => {
    setPeer((prevPeer) => {
      const peerToRemove = prevPeer[socketIdUserDisconnected];
      if (peerToRemove) {
        peerToRemove.destroy();
      }
      const newPeers = { ...prevPeer };
      delete newPeers[socketIdUserDisconnected];
      return newPeers;
    });

    setStreams((prevStreams) => {
      const stream = prevStreams[socketIdUserDisconnected];
      if (stream) {
        stream.instance.getTracks().forEach((track) => {
          track.stop();
        });
      }
      const newStreams = { ...prevStreams };
      delete newStreams[socketIdUserDisconnected];

      return newStreams;
    });
  };
  const initializeRoom = async () => {
    const localStreamResult =
      localStreamRef.current || (await getLocalStream());
    if (localStreamResult) {
      setLocalStream(localStreamResult);
    }
    setIsRoomInitiator(true);
  };
  return (
    <WebRCTContext.Provider
      value={{
        // peer,
        streams,
        localStream,
        loading,
        isRoomInitiator,
        screenSharingStream,
        createPeerConnection,
        signalingData,
        removePeerConnection,
        initializeRoom,
        handleShareScreen,
      }}
    >
      {children}
    </WebRCTContext.Provider>
  );
};

export default WebRCTProvider;
