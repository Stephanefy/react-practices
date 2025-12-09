import { createContext, Dispatch, SetStateAction, FC, useReducer } from 'react';
import produce, { Draft } from 'immer';
import { Task } from '../types';
import { nanoid } from 'nanoid';

//type guards

function isTask(payload: Task | string): payload is Task {
  if (typeof payload === 'object') {
    return 'title' in payload;
  }
  return false;
}

function isString(payload: Task | string): payload is string {
  if (typeof payload === 'string') {
    return true;
  }
  return false;
}

export const enum ModalActionType {
  NONEOPEN = 0,
  MOBILEMENU = 1,
  TASKDETAILS = 2,
  ADDTASK = 3,
  EDITTASK = 4,
  ADDBOARD = 5,
  EDITBOARD = 6,
  ADDCOLUMN = 7,
  DELETETASK = 8,
  DELETEBOARD = 9,
  CHANGE_COMPLETION = 'CHANGE_COMPLETION',
  EDIT_TASK_FIELDS = 'EDIT_TASK_FIELDS',
}

type ActionFieldValue = {
  field: string;
  value: string;
};

export type ModalAction =
  | {
      readonly type: ModalActionType;
      payload?: Task | string;
    }
  | {
      readonly type: ModalActionType;
      payload?: ActionFieldValue;
    };

export interface ModalState {
  showModal: number;
  task: Task;
}

interface ModalContextInterface {
  state: number;
  dispatch?: Dispatch<SetStateAction<boolean>>;
}

interface ModalContextProviderProps {
  children: React.ReactNode;
}

const initialState = {
  showModal: 0,
  task: { id: '', title: '', description: '', status: '', subtasks: [] },
};

export const ModalContext = createContext<{
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const ModalReducer = produce((draft: ModalState, action: ModalAction): void => {
  switch (action.type) {
    case ModalActionType.NONEOPEN:
      draft.showModal = ModalActionType.NONEOPEN;
      draft.task = {
        id: '',
        title: '',
        description: '',
        status: '',
        subtasks: [],
      };
      break;
    case ModalActionType.MOBILEMENU:
      draft.showModal = ModalActionType.MOBILEMENU;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.TASKDETAILS:
      draft.showModal = ModalActionType.TASKDETAILS;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.ADDTASK:
      draft.showModal = ModalActionType.ADDTASK;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.EDITTASK:
      draft.showModal = ModalActionType.EDITTASK;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.ADDBOARD:
      draft.showModal = ModalActionType.ADDBOARD;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.EDITBOARD:
      draft.showModal = ModalActionType.EDITBOARD;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.ADDCOLUMN:
      draft.showModal = ModalActionType.ADDCOLUMN;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.DELETETASK:
      draft.showModal = ModalActionType.DELETETASK;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.DELETEBOARD:
      draft.showModal = ModalActionType.DELETEBOARD;
      draft.task = action.payload as Task;
      break;
    case ModalActionType.CHANGE_COMPLETION:
      draft.task!.subtasks!.map((task: Task) => {
        if (task.id === action!.payload!) {
          task.isCompleted = !task.isCompleted;
        }
      });
    default:
      break;
  }
});

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
