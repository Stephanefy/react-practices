import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import DropDown from "./Dropdown";
import { Task } from "../context/AppContext";
import { ModalActionType } from "../context/ModalContext";

type Props = {};

const EditTask = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);

  const [numOfSubtasks, setNumOfSubtasks] = useState<number>(1);
  const [newTask, setNewTask] = useState<Task | null>(null);

  console.log("state", state);

  return (
    <div className="absolute top-48 left-1/2 w-11/12 -translate-x-1/2 -translate-y-24 transform rounded-lg bg-white pr-3">
      <div className="px-8 py-4">
        <h2 className="my-2 text-2xl font-bold text-primary-black">
          Edit Task
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
              value={state.task.title}
              // onChange={(e) =>
              //   dispatch({
              //     type: ModalActionType.EDIT_TASK_FIELDS,
              //     payload: {
              //       field: "title",
              //       value: e.target.value,
              //     },
              //   })
              // }
              readOnly
              className="w-full rounded-md border border-primary-gray/25 font-semibold text-black placeholder:text-primary-gray/25"
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
              {state.task!.subtasks!.map((subtask, i) => (
                <div key={i} className="my-4 flex">
                  <input
                    id="title"
                    type="text"
                    value={subtask.title}
                    readOnly
                    className="w-full rounded-md border border-primary-gray/25 font-semibold text-black placeholder:text-primary-gray/25"
                    placeholder="e.g. Take coffee break"
                  />
                  <button
                    type="button"
                    onClick={() => setNumOfSubtasks(numOfSubtasks - 1)}
                  >
                    <span className="mx-2  inline-block text-primary-gray">
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
              className="my-4 w-full rounded-full bg-primary/10 py-2 px-4 font-semibold text-primary"
              type="button"
              onClick={() => setNumOfSubtasks(numOfSubtasks + 1)}
            >
              + Add New Subtask
            </button>
          </div>
          <DropDown />
          <div>
            <button
              className="my-4 w-full rounded-full bg-primary py-2 px-4 font-semibold text-white"
              type="button"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
