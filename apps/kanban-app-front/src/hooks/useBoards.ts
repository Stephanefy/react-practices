import { useReducer } from 'react';
import data from '../assets/data.json';

enum BoardActionKind {
  PLATFORM = 'PLATFORM',
  MARKETING = 'MARKETING',
  ROADMAP = 'ROADMAP',
  NEWCOLUMN = 'NEWCOLUMN',
}

interface SubTask {
  title: string;
  isCompleted: boolean;
}

interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
}

interface Column {
  name: string;
  tasks: Task[];
}

interface BoardState {
  name: string;
  columns: Column[];
}

interface BoardAction {
  type: BoardActionKind;
  payload: BoardState;
}

const { boards } = data;

const initialState: BoardState = boards[0];

function BoardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case BoardActionKind.PLATFORM:
      return {
        ...state,
        name: action.payload.name,
        columns: action.payload.columns,
      };
    case BoardActionKind.MARKETING:
      return {
        ...state,
        name: action.payload.name,
        columns: action.payload.columns,
      };
    case BoardActionKind.ROADMAP:
      return {
        ...state,
        name: action.payload.name,
        columns: action.payload.columns,
      };
    default:
      return state;
  }
}

const useBoards = () => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);
};

export default useBoards;
