import { useContext, useEffect } from 'react';
import useWebRTC from '../webRTC/useWebRTC';
import { SocketContext } from './socketContext';
import { SignalData } from 'simple-peer';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const useStreammingWSS = () => {
  const { socket } = useContext(SocketContext);
  const { preparePeerConnection, handleSignalingData, handleUserDisconnected } =
    useWebRTC();

  const handleListenerPrepareConnection = (
    data: {
      offerer: string;
    },
    socketInstance: Socket<DefaultEventsMap, DefaultEventsMap>
  ) => {
    const { offerer } = data;
    /**
     Caller (Offerer): The caller or offerer is the role that initiates the WebRTC connection. This person creates the initial offer (SDP Offer) that describes the media streams and capabilities they want to use during the connection. The offerer sends this offer to the receiver to begin the negotiation process.
    - isInitiator: false: El usuario responde a una solicitud de conexión iniciada por otro. Recibe y procesa las señales del iniciador.
     */
    preparePeerConnection(offerer, false);

    //Inform the user which request connection that we have prepared for incoming connection
    const dataToConfirm = {
      offerer,
    };
    socketInstance.emit('webRTC/confirm-connection', dataToConfirm);
  };

  const handleListenerConfirmConnection = (data: { answerer: string }) => {
    const { answerer } = data;
    /**
    Callee (Answerer): The callee or answerer is the role that responds to the caller’s initial offer. The answerer generates a response (SDP Answer), indicating their media capabilities and what they accept during the connection. This role confirms the connection after receiving the offer.
    isInitiator: true: El usuario inicia la conexión y comienza el intercambio de señales. Es el primer paso en la negociación P2P.
     */
    preparePeerConnection(answerer, true);
  };

  const handleListenerSignalExchange = (data: {
    signal: SignalData;
    peerSocketId: string;
  }) => {
    handleSignalingData(data);
  };

  const handleListenerUserDisconnected = (data: {
    socketIdUserDisconnected: string;
  }) => {
    console.log('handleListenerUserDisconnected', data);
    const { socketIdUserDisconnected } = data;
    handleUserDisconnected(socketIdUserDisconnected);
  };
  useEffect(() => {
    if (!socket) return;

    socket.listeners('webRTC/prepare-connection').length == 0 &&
      socket.on('webRTC/prepare-connection', (data) => {
        handleListenerPrepareConnection(data, socket);
      });

    socket.listeners('webRTC/confirm-connection').length == 0 &&
      socket.on('webRTC/confirm-connection', handleListenerConfirmConnection);

    socket.listeners('webRTC/signal-exchange').length == 0 &&
      socket.on('webRTC/signal-exchange', handleListenerSignalExchange);

    socket.listeners('user-disconnected').length == 0 &&
      socket.on('user-disconnected', handleListenerUserDisconnected);

    return () => {
      socket.off('webRTC/prepare-connection');
      socket.off('webRTC/confirm-connection');
      socket.off('webRTC/signal-exchange');
      socket.off('user-disconnected');
    };
  }, [socket]);
  return {};
};

export default useStreammingWSS;
