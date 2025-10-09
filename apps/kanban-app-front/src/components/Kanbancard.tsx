import { useContext } from 'react';
import { Task, AppContext } from '../context/AppContext';
import { ModalContext, ModalActionType } from '../context/ModalContext';
import { nanoid } from 'nanoid';

const Kanbancard = ({
  id,
  title,
  description,
  status,
  subtasks,
  columnId,
}: Task & { columnId: string }) => {
  const subtasksCount = subtasks!.reduce((acc, subtask) => {
    if (subtask.isCompleted) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const { dispatch } = useContext(ModalContext);
  const { currentBoard, setCurrentSelectedColumn } = useContext(AppContext);

  const payload = {
    id,
    title,
    description,
    status,
    subtasks: subtasks!.map(task => ({
      id: nanoid(),
      ...task,
    })),
  };

  return (
    <div
      onClick={() => {
        dispatch({ type: ModalActionType.TASKDETAILS, payload });
        setCurrentSelectedColumn(
          currentBoard?.columns.find(col => col.id === columnId) ?? null
        );
      }}
      className="mt-4 w-full cursor-pointer rounded-lg bg-white px-3 py-8 hover:bg-primary-gray/10"
    >
      <h4 className="text-sm font-bold text-primary-black">{title}</h4>
      <p className="text-sm font-bold text-primary-gray">
        {subtasksCount} of {subtasks!.length} subtasks
      </p>
    </div>
  );
};

export default Kanbancard;
