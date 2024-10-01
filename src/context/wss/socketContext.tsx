import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

// Definir los tipos del contexto
interface SocketContextProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

// Crear el contexto y asignar un valor inicial
export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});
