import { createContext, useState, useEffect } from "react";
import { Column } from "./BoardContext";
import { nanoid } from "nanoid";
import { getBoards } from "../services/boardServices";

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

async function getInitialBoards() {

  const data = await getBoards();

  return data.map((board, boardIndex) => ({
    ...board,
    id: nanoid(),
    columns: board.columns.map((column, columnIndex) => ({
      ...column,
      id: nanoid(),
    })),
  }));
}

export const AppContext = createContext<{
  currentBoard: Board | null;
  setCurrentBoard: (board: Board | null) => void;
  boards: Board[];
  setBoards: (boards: Board[]) => void;
}>({ currentBoard: null, boards: [], setBoards: () => {}, setCurrentBoard: () => {} });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  useEffect(() => {
    let mounted = true;
    getInitialBoards().then((initial) => {
      if (!mounted) return;
      setBoards(initial);
      setCurrentBoard(initial[0] ?? null);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppContext.Provider value={{ currentBoard, boards, setBoards, setCurrentBoard }}>
      {children}
    </AppContext.Provider>
  );
};
