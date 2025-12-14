import { useState, useEffect, useId, useContext } from 'react';
import DropDown from '../../components/Dropdown';
import { Column, SubTask, Task } from '../../types';
import { nanoid } from 'nanoid';
import { AppContext } from '../../context/AppContext';
import { ModalContext, ModalActionType } from '../../context/ModalContext';
import { api } from '../../api/axios';
import { getBoards } from '../../services/boardServices';

interface FormState {
  title: string;
  description: string;
  subtasks: SubTask[];
}

async function createNewTask(
  formData: FormState,
  currentBoardNameId: string
): Promise<[boolean, any]> {
  const response = await api.get(`/boards/${currentBoardNameId}`);

  if (!response) throw new Error('Failed to fetch board');

  const board = response.data;

  const todoColumn = board.columns.find(
    (col: any) => col.id === 'col-platform-todo'
  );

  const lastTaskId = todoColumn.tasks[todoColumn.tasks.length - 1].id.replace(
    'task-',
    ''
  );

  const updatedTodoColumn = {
    ...todoColumn,
    tasks: [
      ...todoColumn.tasks,
      {
        id: 'task-' + String(+lastTaskId + 1),
        order: 0,
        title: formData.title,
        description: formData.description,
        status: 'Todo',
        columnCategory: 'Todo',
        subtasks: formData.subtasks.length > 0 ? [...formData.subtasks] : [],
      },
    ],
  };

  const updateResponse = await api.put(`/boards/${currentBoardNameId}`, {
    ...board,
    columns: board.columns.map((col: Column) => {
      if (col.id === updatedTodoColumn.id) {
        return updatedTodoColumn;
      }
      return col;
    }),
  });

  if (!updateResponse) {
    return [false, null];
  }

  return [true, updatedTodoColumn];
}

export function AddTaskForm() {
  const [numOfSubtasks, setNumOfSubtasks] = useState<SubTask[]>([]);
  const { currentBoard, setBoards, setCurrentBoard } = useContext(AppContext);
  const { dispatch: setShowModal } = useContext(ModalContext);

  const [formData, setFormData] = useState<FormState>({
    title: '',
    description: '',
    subtasks: [],
  });

  useEffect(() => {
    console.log(numOfSubtasks);
  }, [numOfSubtasks]);

  const onTaskFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const currentSubTaskId = e.currentTarget.id.replace('subtask-', '');
    console.log(numOfSubtasks);
    const index = numOfSubtasks.findIndex(sub => sub.id === currentSubTaskId);

    setNumOfSubtasks(prevState =>
      prevState.map((sub, i) => (i === index ? { ...sub, title: value } : sub))
    );

    setFormData(prev => {
      return {
        ...prev,
        subtasks: [...numOfSubtasks],
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createNewTask(formData, currentBoard!.id);

    if (result[0]) {
      if (result[0]) {
        getBoards().then(boards => {
          setBoards(boards);
          const updatedCurrentBoard = boards.find(
            b => b.id === currentBoard?.id
          );
          if (updatedCurrentBoard) {
            setCurrentBoard(updatedCurrentBoard);
          }
        });
        setShowModal({ type: ModalActionType.NONEOPEN });
      }
      setShowModal({ type: ModalActionType.NONEOPEN });
    }
  };

  useEffect(() => {
    console.log(currentBoard);
  }, [formData]);

  return (
    <form className="text-black" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="title"
          className="my-2 inline-block font-semibold text-primary-gray"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={onTaskFormChange}
          className="w-full rounded-md border border-primary-gray/25 text-black placeholder:text-primary-gray/25"
          placeholder="e.g. Take coffee break"
        />
      </div>
      <div>
        <label
          htmlFor="title"
          className="my-2 inline-block font-semibold text-primary-gray"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onTaskFormChange}
          rows={5}
          className="w-full rounded-md border border-primary-gray/25 placeholder:text-primary-gray/25"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
        />
      </div>
      <div>
        <h3 className="my-2 inline-block font-semibold text-primary-gray">
          Subtasks
        </h3>
        <div>
          {numOfSubtasks.map((sub, i) => (
            <div key={sub.id} className="my-4 flex">
              <input
                id={`subtask-${sub.id}`}
                type="text"
                value={sub.title}
                onChange={onSubTaskChange}
                className="w-full rounded-md border border-primary-gray/25 placeholder:text-primary-gray/25"
                placeholder="e.g. Take coffee break"
              />
              <button
                type="button"
                onClick={() =>
                  setNumOfSubtasks(prevState => {
                    const updatedSubTasksList = prevState.slice(
                      0,
                      prevState.length - 1
                    );

                    return updatedSubTasksList;
                  })
                }
              >
                <span className="mx-2 inline-block text-primary-gray">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>
        <button
          className="my-4 w-full rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary"
          type="button"
          onClick={() =>
            setNumOfSubtasks(prevState => {
              const updatedSubTasksList = [
                ...prevState,
                { id: nanoid(), title: '', isCompleted: false },
              ];
              return updatedSubTasksList;
            })
          }
        >
          + Add New Subtask
        </button>
      </div>
      {/* <DropDown /> */}
      <div>
        <button
          type="submit"
          className="my-4 w-full rounded-full bg-primary px-4 py-2 font-semibold text-white"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
