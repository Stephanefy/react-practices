import { createContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getBoards } from '../services/boardServices';
import { type Board, type Column, type Task } from '../types';
import { deleteTaskFromColumn } from '../api/tasks/tasks';
import { updateColumn } from '../api/columns/columns';

async function getInitialBoards() {
  const data = await getBoards();

  return data.map((board, boardIndex) => ({
    ...board,
    columns: board.columns.map((column: Column, columnIndex: number) => ({
      ...column,
      tasks: column.tasks.map(task => ({
        ...task,
        subtasks: task.subtasks?.map(subtask => ({
          ...subtask,
        })),
      })),
    })),
  }));
}

export const AppContext = createContext<{
  currentBoard: Board | null;
  currentSelectedColumn: Column | null;
  setCurrentSelectedColumn: (column: Column | null) => void;
  setCurrentColumn: (columnId: string, payload: string | Task | Task[]) => void;
  setCurrentBoard: (board: Board | null) => void;
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  addColumnToCurrentBoard: (columnName: string) => void;
  deleteColumnFromCurrentBoard: (columnId: string) => void;
  updateCurrentBoardInBoards: (updatedBoard: Board) => void;
  renameCurrentBoard: (newName: string) => void;
  deleteCurrentBoard: () => void;
  addTaskToCurrentColumn: (task: Task, columnId: string) => void;
  removeTaskFromCurrentColumn: (taskId: string, columnId: string) => void;
}>({
  currentBoard: null,
  currentSelectedColumn: null,
  setCurrentSelectedColumn: () => {},
  boards: [],
  setBoards: () => {},
  setCurrentBoard: () => {},
  setCurrentColumn: () => {},
  addColumnToCurrentBoard: () => {},
  deleteColumnFromCurrentBoard: () => {},
  updateCurrentBoardInBoards: () => {},
  renameCurrentBoard: () => {},
  deleteCurrentBoard: () => {},
  addTaskToCurrentColumn: () => {},
  removeTaskFromCurrentColumn: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentSelectedColumn, setCurrentSelectedColumn] =
    useState<Column | null>(null);

  const setCurrentColumn = async (
    columnId: string,
    payload: string | Task | Task[]
  ) => {
    const column =
      currentBoard?.columns.find(col => col.id === columnId) ?? null;

    if (!column) return;

    const updatedColumn = {
      ...column,
      ...(typeof payload === 'string'
        ? {
            id: `col-${currentBoard?.name.replace(' ', '-').toLowerCase()}-${payload.toLowerCase()}`,
            name: payload,
          }
        : {
            tasks: Array.isArray(payload)
              ? payload
              : [...(column?.tasks || []), payload],
          }),
    } as Column;

    const board = boards.find(b => b.id === currentBoard?.id) ?? null;

    const updatedBoard = {
      ...board,
      columns: board?.columns.map(col =>
        col.id === columnId ? updatedColumn : col
      ),
    } as Board;

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => (b.id === currentBoard?.id ? updatedBoard : b)));

    await updateColumn(currentBoard!.id, updatedBoard);
  };

  useEffect(() => {
    let mounted = true;
    getInitialBoards().then(initial => {
      if (!mounted) return;
      setBoards(initial);
      setCurrentBoard(initial[0] ?? null);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const addColumnToCurrentBoard = (columnName: string) => {
    if (!currentBoard) return;

    const newColumn = { id: nanoid(), name: columnName, tasks: [] };
    const updatedBoard = {
      ...currentBoard,
      columns: [newColumn, ...currentBoard.columns],
    };

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  const renameCurrentBoard = (newName: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      name: newName,
    };

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  const deleteCurrentBoard = () => {
    if (!currentBoard) return;
    setBoards(boards.filter(b => b.id !== currentBoard.id));
    setCurrentBoard(null);
  };

  const deleteColumnFromCurrentBoard = (columnId: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.filter(col => col.id !== columnId),
    };

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  const updateCurrentBoardInBoards = (updatedBoard: Board) => {
    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => (b.id === updatedBoard.id ? updatedBoard : b)));
  };

  const addTaskToCurrentColumn = (task: Task, columnId: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: [
        ...currentBoard.columns,
        { id: nanoid(), name: 'New Column', tasks: [task] },
      ],
    };

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  const removeTaskFromCurrentColumn = (taskId: string, columnId: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
          : col
      ),
    };
    deleteTaskFromColumn(taskId, currentBoard.id, columnId);
    setCurrentBoard(updatedBoard); // ✅ Updates currentBoard
    setBoards(boards.map(b => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  return (
    <AppContext.Provider
      value={{
        currentBoard,
        boards,
        currentSelectedColumn,
        setCurrentSelectedColumn,
        setCurrentColumn,
        setBoards,
        setCurrentBoard,
        addColumnToCurrentBoard,
        deleteColumnFromCurrentBoard,
        updateCurrentBoardInBoards,
        renameCurrentBoard,
        deleteCurrentBoard,
        addTaskToCurrentColumn,
        removeTaskFromCurrentColumn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
