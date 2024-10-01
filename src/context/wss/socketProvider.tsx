import { useEffect, ReactNode, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { SocketContext } from './socketContext';
import getEnvVariable from '../../utils/envs/enviroments';

const SERVER = getEnvVariable().AUTH_API_URL; //'http://localhost:5002';
// const SERVER = 'http://54.158.134.230';

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    const socketInstance = io(SERVER); // Crea una única conexión
    setSocket(socketInstance); // Actualiza el estado con la instancia del socket

    socketInstance.on('connect', () => {
      console.log('Connected to the server with ID:', socketInstance.id);
    });

    return () => {
      if (socket) {
        socket.disconnect(); // Desconecta el socket al desmontar
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
