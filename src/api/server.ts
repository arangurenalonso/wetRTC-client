import axios from 'axios';
import getEnvVariable from '../utils/envs/enviroments';

const baseUrl = `${getEnvVariable().AUTH_API_URL}/api`;
// const baseUrl = 'http://54.158.134.230/api';
interface RoomExistsResponse {
  roomExist: boolean;
  roomFull?: boolean;
}
export const serverApi = {
  checkRoom: async (roomId: string): Promise<RoomExistsResponse> => {
    const response = await axios.get(`${baseUrl}/check-room/${roomId}`);
    return response.data as RoomExistsResponse; // Cast the response data to RoomStatus type
  },
  createRoom: async (roomId: string): Promise<void> => {
    await axios.post(`${baseUrl}/create-room/${roomId}`);
  },
};
