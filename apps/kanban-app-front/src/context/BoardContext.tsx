import { useReducer, createContext, ReactNode, useContext } from "react";
import data from "../assets/data.json";
import produce, { Draft } from "immer";
import { AppContext } from "./AppContext";


export enum BoardActionKind {
  PLATFORM = "PLATFORM",
  MARKETING = "MARKETING",
  ROADMAP = "ROADMAP",
  NEWCOLUMN = "NEWCOLUMN",
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
}

export interface Column {
  id: string;
  readonly name: string;
  readonly tasks: readonly Task[];
}

export interface BoardState {
  name: string;
  columns: Column[];
}

export interface BoardAction {
  type: BoardActionKind;
  payload: {
    name: string;
    columns: Column[];
  };
}

interface BoardContextProviderProps {
  children: JSX.Element | JSX.Element[];
}


const initialState: BoardState = {
  name: "",
  columns: [],
};

const BoardContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const BoardReducer = produce((draft: BoardState, action: BoardAction): void => {
  switch (action.type) {
    case BoardActionKind.PLATFORM:
      (draft.name = action.payload.name),
        (draft.columns = action.payload.columns);
      break;

    case BoardActionKind.MARKETING:
      (draft.name = action.payload.name),
        (draft.columns = action.payload.columns);
      break;
    case BoardActionKind.ROADMAP:
      (draft.name = action.payload.name),
        (draft.columns = action.payload.columns);
      break;
    case BoardActionKind.NEWCOLUMN:
      (draft.name = action.payload.name),
        (draft.columns = action.payload.columns);      
      break;  
    default:
      break;
  }
});

const BoardContextProvider = ({ children }: BoardContextProviderProps) => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContextProvider, BoardContext };
