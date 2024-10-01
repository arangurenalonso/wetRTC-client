import { useContext } from 'react';
import { SignalData } from 'simple-peer';
import { WebRCTContext } from './webRCTContext';
import useEmitSocket from '../wss/useEmitSocket';

const useWebRTC = () => {
  const { createNewRoom, joinRoom } = useEmitSocket();

  const {
    createPeerConnection,
    signalingData,
    removePeerConnection,
    initializeRoom,
    localStream,
    peer,
    streams,
    loading,
  } = useContext(WebRCTContext);

  const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost: boolean,
    participantName: string = '',
    roomId: string = ''
  ) => {
    isRoomHost
      ? createNewRoom(participantName)
      : joinRoom(roomId, participantName);
  };

  const preparePeerConnection = async (
    connectedUsersSocketId: string,
    isInitiator: boolean
  ) => {
    createPeerConnection(connectedUsersSocketId, isInitiator);
  };

  const handleSignalingData = (data: {
    signal: SignalData;
    peerSocketId: string;
  }) => {
    signalingData(data);
  };

  const handleUserDisconnected = (socketIdUserDisconnected: string) => {
    removePeerConnection(socketIdUserDisconnected);
  };

  const toggleLocalAudio = (isMute: boolean) => {
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = isMute ? false : true;
    });
  };
  const toggleLocalVideo = (isMute: boolean) => {
    localStream?.getVideoTracks().forEach((track) => {
      track.enabled = isMute ? false : true;
    });
  };

  return {
    //Properties
    loading,
    peer,
    streams,
    localStream,
    //Methods
    getLocalPreviewAndInitRoomConnection,
    preparePeerConnection,
    handleSignalingData,
    handleUserDisconnected,
    toggleLocalAudio,
    toggleLocalVideo,
    initializeRoom,
  };
};

export default useWebRTC;
