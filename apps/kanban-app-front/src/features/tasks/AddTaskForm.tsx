import { useState, useEffect } from 'react';
import DropDown from '../../components/Dropdown';
import { Task } from '../../context/AppContext';

export function AddTaskForm() {
  const [numOfSubtasks, setNumOfSubtasks] = useState<number>(1);

  return (
    <form className="text-black">
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
          id="title"
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
          {[...Array(numOfSubtasks).keys()].map(i => (
            <div key={i} className="my-4 flex">
              <input
                id="title"
                type="text"
                className="w-full rounded-md border border-primary-gray/25 placeholder:text-primary-gray/25"
                placeholder="e.g. Take coffee break"
              />
              <button
                type="button"
                onClick={() => setNumOfSubtasks(numOfSubtasks - 1)}
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
          onClick={() => setNumOfSubtasks(numOfSubtasks + 1)}
        >
          + Add New Subtask
        </button>
      </div>
      {/* <DropDown /> */}
      <div>
        <button
          className="my-4 w-full rounded-full bg-primary px-4 py-2 font-semibold text-white"
          type="button"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
