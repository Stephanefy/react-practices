import { api } from '../api/axios';
import type { Board } from '../context/AppContext';

export const getBoards = async (): Promise<Board[]> => {
  const response = await api.get('/boards');

  console.log(response);
  return response.data;
};
