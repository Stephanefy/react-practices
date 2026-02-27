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
  order: number;
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  subtasks?: SubTask[];
  isCompleted?: boolean;
  columnCategory?: string;
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
  PLATFORM = "PLATFORM",
  MARKETING = "MARKETING",
  ROADMAP = "ROADMAP",
  NEWCOLUMN = "NEWCOLUMN",
  DELETECOLUMN = "DELETECOLUMN",
}

export interface BoardAction {
  type: BoardActionKind;
  payload: {
    name?: string;
    columns?: Column[];
    id?: string;
  };
}
