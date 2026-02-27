import { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import DropDown from './Dropdown';
import { AppContext } from '../context/AppContext';
import { Column } from '../types';
import { nanoid } from 'nanoid';

type Props = {};

const columns = [
  {
    id: nanoid(),
    name: 'Todo',
    tasks: [
      {
        order: 0,
        title: '',
        description: '',
        status: '',
        subtasks: [{ title: '', isCompleted: false }],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Doing',
    tasks: [
      {
        order: 1,
        title: '',
        description: '',
        status: '',
        subtasks: [{ title: '', isCompleted: false }],
      },
    ],
  },
];

const DeleteBoard = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  const { currentBoard } = useContext(AppContext);

  const [numOfSubtasks, setNumOfSubtasks] = useState<number>(1);
  const [newColumn, setNewColumn] = useState<Column[]>(columns);

  // TODO add controlled state to add new task in board

  return (
    <div className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-24 transform rounded-lg bg-white pr-3">
      <div className="px-8 py-4">
        <h2 className="my-2 text-2xl font-bold text-primary-red">
          Delete Board
        </h2>
        <form>
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
              readOnly
              value={currentBoard?.name}
              className="w-full rounded-md border border-primary-gray/25 font-semibold text-black placeholder:text-primary-gray/25"
              placeholder="e.g. Take coffee break"
            />
          </div>
          <div>
            <h3 className="my-2 inline-block font-semibold text-primary-gray">
              Subtasks
            </h3>
            <div>
              {newColumn.map((column, i) => (
                <div key={i} className="my-4 flex">
                  <input
                    id="title"
                    type="text"
                    value={column.name}
                    readOnly
                    className="w-full rounded-md border border-primary-gray/25 font-semibold text-black placeholder:text-primary-gray/25"
                    placeholder="e.g. Take coffee break"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const deletedColumn = newColumn.filter(
                        col => col.id !== column.id
                      );
                      setNewColumn(deletedColumn);
                    }}
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
            >
              Delete
            </button>
          </div>
          <div>
            <button
              className="my-4 w-full rounded-full bg-primary px-4 py-2 font-semibold text-white"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteBoard;
