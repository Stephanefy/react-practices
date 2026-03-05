import { api } from '../axios';

export const updateCurrentWorkspace = async (updatedWorkspace: any) => {
  console.log(updatedWorkspace);
  const response = await api.post(`/boards`, JSON.stringify(updatedWorkspace));

  if (!response) throw new Error('Failed to update current workspace');

  return response.data;
};

export const getBoardWithColumnsTasksSubtasks = async () => {
  const response = await api.get(`/boards`);

  if (!response) throw new Error('Failed to get boards');

  return response.data;
};
