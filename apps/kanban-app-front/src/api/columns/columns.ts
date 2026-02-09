import { api } from '../axios';

export const createNewColumn = async (
  columnName: string,
  currentBoardId: string
) => {
  const response = await api.post(`/boards/${currentBoardId}/columns`, {
    name: columnName,
  });

  if (!response) throw new Error('Failed to create column');

  return response.data;
};

export const updateColumn = async (
  currentBoardId: string,
  updatedBoard: any
) => {
  const response = await api.put(`/boards/${currentBoardId}`, updatedBoard);

  if (!response) throw new Error('Failed to update column');

  return response.data;
};

export const deleteColumn = async (
  columnId: string,
  currentBoardId: string
) => {
  const response = await api.delete(
    `/boards/${currentBoardId}/columns/${columnId}`
  );
};
