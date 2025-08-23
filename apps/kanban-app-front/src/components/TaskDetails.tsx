import { FC, useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import Checkbox from "./Checkbox";
import { nanoid } from "nanoid";
import { ModalActionType } from "../context/ModalContext";
import DropDown from "./Dropdown";
import VerticalElipsis from "../assets/icon-vertical-ellipsis.svg";

interface Props {}

const TaskDetails: FC<Props> = (props): JSX.Element => {
  const { state, dispatch } = useContext(ModalContext);

  // temporary fix to set id for each subtasks
  const subTasksWithId = state.task!.subtasks!.map((task) => ({
    id: nanoid(),
    ...task,
  }));

  const completedTaskNumber = state.task!.subtasks!.filter(
    (task) => task.isCompleted
  ).length;

  console.log(completedTaskNumber);

  return (
    <div className="absolute top-64 left-1/2 w-11/12 -translate-x-1/2 -translate-y-10 transform rounded-lg bg-white pr-3">
      <div className="px-8 py-4">
        <div className="flex w-full justify-between">
          <h2 className="text-1xl font-bold text-primary-black">
            {state!.task!.title}
          </h2>
          <button
            onClick={() =>
              dispatch({ type: ModalActionType.EDITTASK, payload: state.task })
            }
            type="button"
          >
            <img src={VerticalElipsis} alt="" />
          </button>
        </div>
        <p className="my-6 text-sm text-primary-gray">
          {state.task?.description ?? "No description"}
        </p>
        <ul>
          <h3 className="my-4 text-sm font-semibold text-primary-gray">
            Subtasks ({completedTaskNumber} of {state.task!.subtasks!.length})
          </h3>
          {state.task!.subtasks!.length > 0 ? (
            subTasksWithId.map((task) => (
              <li
                key={nanoid()}
                className={`${
                  task.isCompleted
                    ? "text-primary-gray line-through"
                    : "text-secondary-black"
                } my-2 rounded-md bg-secondary-gray py-4 px-1 text-sm font-bold`}
              >
                <Checkbox
                  value={task.title}
                  label={task.title}
                  checked={task.isCompleted}
                  onChange={() =>
                    dispatch({
                      type: ModalActionType.CHANGE_COMPLETION,
                      payload: task.id,
                    })
                  }
                />
              </li>
            ))
          ) : (
            <p>no subtasks</p>
          )}
        </ul>
        <DropDown />
      </div>
    </div>
  );
};

export default TaskDetails;
