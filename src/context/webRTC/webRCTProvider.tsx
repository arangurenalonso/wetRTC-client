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
  [key: string]: MediaStream;
}

const WebRCTProvider = ({ children }: WebRCTProviderProps) => {
  const [peer, setPeer] = useState<PeersMap>({});
  const [streams, setStreams] = useState<StreamMap>({});
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const { signalPeerData } = useEmitSocket();
  const [isRoomInitiator, setIsRoomInitiator] = useState<boolean>(false);
  const { getLocalStream, loading } = usePermission();

  useEffect(() => {
    console.log('localStream', localStream);
  }, [localStream]);
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
          [usersSocketId]: stream,
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
      stream.getTracks().forEach((track) => {
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
        stream.getTracks().forEach((track) => track.stop());
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
        createPeerConnection,
        signalingData,
        removePeerConnection,
        initializeRoom,
      }}
    >
      {children}
    </WebRCTContext.Provider>
  );
};

export default WebRCTProvider;
