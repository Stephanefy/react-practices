import { createContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getBoards } from '../services/boardServices';

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface SubTask {
  id?: string;
  readonly title: string;
  isCompleted: boolean;
}

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  subtasks?: SubTask[];
  isCompleted?: boolean;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface BoardState {
  name: string;
  columns: Column[];
}

export enum BoardActionKind {
  PLATFORM = 'PLATFORM',
  MARKETING = 'MARKETING',
  ROADMAP = 'ROADMAP',
  NEWCOLUMN = 'NEWCOLUMN',
  DELETECOLUMN = 'DELETECOLUMN',
}

export interface BoardAction {
  type: BoardActionKind;
  payload: {
    name?: string;
    columns?: Column[];
    id?: string;
  };
}

async function getInitialBoards() {
  const data = await getBoards();

  return data.map((board, boardIndex) => ({
    ...board,
    id: nanoid(),
    columns: board.columns.map((column, columnIndex) => ({
      ...column,
      id: nanoid(),
      tasks: column.tasks.map(task => ({
        ...task,
        id: nanoid(),
        subtasks: task.subtasks?.map(subtask => ({
          ...subtask,
          id: nanoid(),
        })),
      })),
    })),
  }));
}

export const AppContext = createContext<{
  currentBoard: Board | null;
  currentSelectedColumn: Column | null;
  setCurrentSelectedColumn: (column: Column | null) => void;
  setCurrentColumn: (columnId: string, payload: string | Task) => void;
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

  const setCurrentColumn = (columnId: string, payload: string | Task) => {
    const column =
      currentBoard?.columns.find(col => col.id === columnId) ?? null;

    const updatedColumn = {
      ...column,
      ...(typeof payload === 'string'
        ? { name: payload }
        : { tasks: [payload] }),
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

    console.log(taskId, columnId);

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
          : col
      ),
    };
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
