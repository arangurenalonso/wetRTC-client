import { ReactNode, useEffect, useState } from 'react';
import { WebRCTContext } from './webRCTContext';
import Peer, { SignalData } from 'simple-peer';
import useEmitSocket from '../wss/useEmitSocket';
import usePermission from '../../hooks/usePermissions';

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
  const { signalPeerData } = useEmitSocket();
  const [isRoomInitiator, setIsRoomInitiator] = useState<boolean>(false);
  const { getLocalStream, loading } = usePermission();
  const [screenSharingStream, setScreenSharingStream] =
    useState<MediaStream | null>(null);

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
      screenSharingStream?.getTracks().forEach((track) => track.stop());
      setScreenSharingStream(null);
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
  const getConfiguration = () => {
    return {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
      ],
    };
  };

  const createPeerConnection = async (
    usersSocketId: string,
    isInitiator: boolean
  ) => {
    const localStreamResult = localStream || (await getLocalStream());
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
        console.log('new stream come');
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
      setPeer((prev) => ({ ...prev, [usersSocketId]: peerInstance }));

      console.log('createNewPeerConnection finish');
    } catch (error) {
      console.log('createNewPeerConnection error', error);
    }
  };

  const signalingData = async (data: {
    signal: SignalData;
    peerSocketId: string;
  }) => {
    console.log('handleSignalingData');
    setPeer((prev) => {
      const { signal, peerSocketId } = data;
      const existingPeer = prev[peerSocketId];
      if (existingPeer) {
        existingPeer.signal(signal);
      }
      return { ...prev, [peerSocketId]: existingPeer };
    });
  };

  const removePeerConnection = (socketIdUserDisconnected: string) => {
    const stream = streams[socketIdUserDisconnected];
    if (stream) {
      stream.instance.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setStreams((prev) => {
      const newStreams = { ...prev };
      delete newStreams[socketIdUserDisconnected];
      return newStreams;
    });
    const peers = peer[socketIdUserDisconnected];
    if (peers) {
      peers.destroy();
    }
    setPeer((prev) => {
      const newPeers = { ...prev };
      delete newPeers[socketIdUserDisconnected];
      return newPeers;
    });
  };

  useEffect(() => {
    return () => {
      // Cleanup the stream when the component unmounts
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null); // Limpiar el estado local
      }
      //Clean up the peer connection
      Object.values(peer).forEach((p) => p.destroy());
      setPeer({});
      //Clean up the streams
      Object.values(streams).forEach((stream) => {
        stream.instance.getTracks().forEach((track) => track.stop());
      });
      setStreams({});
    };
  }, []);

  const initializeRoom = async () => {
    const localStreamResult = localStream || (await getLocalStream());
    if (localStreamResult) {
      setLocalStream(localStreamResult);
    }
    setIsRoomInitiator(true);
  };
  return (
    <WebRCTContext.Provider
      value={{
        peer,
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
