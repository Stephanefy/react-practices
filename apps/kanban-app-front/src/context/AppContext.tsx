import { createContext, useState } from "react";
import { Column } from "./BoardContext";
import data from "../assets/data.json";
import { nanoid } from "nanoid";

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

function getInitialBoards() {
  return data.boards.map((board, boardIndex) => ({
    ...board,
    id: nanoid(),
    columns: board.columns.map((column, columnIndex) => ({
      ...column,
      id: nanoid(),
    })),
  }));
}

export const AppContext = createContext<{
  currentBoard: Board;
  setCurrentBoard: (board: Board) => void;
  boards: Board[];
  setBoards: (boards: Board[]) => void;
}>({ currentBoard: getInitialBoards()[0], boards: [], setBoards: () => {}, setCurrentBoard: () => {} });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [boards, setBoards] = useState<Board[]>(getInitialBoards());
  const [currentBoard, setCurrentBoard] = useState<Board>(boards[0]);

  return (
    <AppContext.Provider value={{ currentBoard, boards, setBoards, setCurrentBoard }}>
      {children}
    </AppContext.Provider>
  );
};
