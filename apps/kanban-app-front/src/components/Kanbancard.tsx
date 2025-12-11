import { useContext } from 'react';
import { type Task } from '../types';
import { AppContext } from '../context/AppContext';
import { ModalContext, ModalActionType } from '../context/ModalContext';
import { nanoid } from 'nanoid';

interface KanbanCardProps extends Task {
  columnId: string;
  orderIdx: number;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
  draggedTask?: Task | null;
}

const Kanbancard = ({
  id,
  title,
  description,
  status,
  subtasks,
  columnId,
  onDragStart,
  onDragOver,
  onDragEnd,
  draggedTask,
  orderIdx,
}: KanbanCardProps) => {
  const subtasksCount = subtasks!.reduce((acc: number, subtask) => {
    if (subtask.isCompleted) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const { dispatch } = useContext(ModalContext);
  const { currentBoard, setCurrentSelectedColumn } = useContext(AppContext);

  const currentColumn = currentBoard?.columns.find(col => col.id === columnId);

  const payload = {
    order: currentColumn?.tasks.length! + 1,
    id,
    title,
    description,
    status,
    subtasks: subtasks!.map((task: any) => ({
      id: nanoid(),
      ...task,
    })),
  };

  return (
    <div
      data-orderidx={orderIdx}
      data-task-id={id}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onClick={() => {
        dispatch({ type: ModalActionType.TASKDETAILS, payload });
        setCurrentSelectedColumn(
          currentBoard?.columns.find(col => col.id === columnId) ?? null
        );
      }}
      className={`mt-4 w-full cursor-grab rounded-lg bg-white px-3 py-8 hover:bg-primary-gray/10 ${
        draggedTask?.id === id ? 'opacity-50' : ''
      }`}
    >
      <h4 className="text-sm font-bold text-primary-black">{title}</h4>
      <p className="text-sm font-bold text-primary-gray">
        {subtasksCount} of {subtasks!.length} subtasks
      </p>
    </div>
  );
};

export default Kanbancard;
