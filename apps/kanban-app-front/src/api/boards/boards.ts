import { api } from '../axios';

export const updateCurrentWorkspace = async (updatedWorkspace: any) => {
  console.log(updatedWorkspace);
  const response = await api.post(`/boards`, JSON.stringify(updatedWorkspace));

  if (!response) throw new Error('Failed to update current workspace');

  return response.data;
};
