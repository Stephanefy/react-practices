import { api } from '../axios';
import { FormState } from '../../features/tasks/AddTaskForm';
import { Column, Task } from '../../types';

export const createNewTask = async (
  formData: FormState,
  currentBoardNameId: string
): Promise<[boolean, any]> => {
  const response = await api.get(`/boards/${currentBoardNameId}`);

  if (!response) throw new Error('Failed to fetch board');

  const board = response.data;

  const todoColumn = board.columns.find(
    (col: any) => col.id === 'col-platform-todo'
  );

  const lastTaskId = todoColumn.tasks[todoColumn.tasks.length - 1].id.replace(
    'task-',
    ''
  );

  const updatedTodoColumn = {
    ...todoColumn,
    tasks: [
      ...todoColumn.tasks,
      {
        id: 'task-' + String(+lastTaskId + 1),
        order: 0,
        title: formData.title,
        description: formData.description,
        status: 'Todo',
        columnCategory: 'Todo',
        subtasks: formData.subtasks.length > 0 ? [...formData.subtasks] : [],
      },
    ],
  };

  const updateResponse = await api.put(`/boards/${currentBoardNameId}`, {
    ...board,
    columns: board.columns.map((col: Column) => {
      if (col.id === updatedTodoColumn.id) {
        return updatedTodoColumn;
      }
      return col;
    }),
  });

  if (!updateResponse) {
    return [false, null];
  }

  return [true, updatedTodoColumn];
};

export const deleteTaskFromColumn = async (
  taskId: string,
  currentBoardId: string,
  columnId: string
) => {
  const response = await api.get(`/boards/${currentBoardId}`);

  const board = response.data;
  const column = board.columns.find((col: Column) => col.id === columnId);

  const updatedTask = column.tasks.filter((task: Task) => task.id !== taskId);

  const updateResponse = await api.put(`/boards/${currentBoardId}`, {
    ...board,
    columns: board.columns.map((col: Column) => {
      if (col.id === columnId) {
        return { ...col, tasks: updatedTask }; // Also update the tasks array
      }
      return col;
    }),
  });
};

export const moveTaskBetweenColumns = async (
  boardId: string,
  sourceColumnId: string,
  targetColumnId: string,
  taskId: string,
  task: Task,
  updatedBoard: any
) => {
  // Use the already-updated board from the caller instead of fetching again
  // This prevents race conditions where the task could be added twice
  const updateResponse = await api.put(`/boards/${boardId}`, updatedBoard);

  return updateResponse;
};
