import { FC, useContext, ReactNode, useEffect} from "react";
import Switchbuton from "./Switchbutton";
import { BoardActionKind, useBoardContext } from "../context/BoardContext";
import { ModalActionType, ModalContext } from "../context/ModalContext";
import { AppContext } from "../context/AppContext";

interface Props {}

const MobileMenu: FC<Props> = (props): ReactNode => {
  const { state, dispatch } = useBoardContext();
  const { boards } = useContext(AppContext);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  

  console.log(state);

  return (
    <div className="absolute top-64 left-1/2 w-[234px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white pr-3">
      <ul className="w-full py-3 pl-3">
        <h3 className="pl-3 text-xs font-bold uppercase text-primary-gray">
          <span className="mr-2">all</span>
          <span>boards</span> <span className="ml-1">({boards.length})</span>
        </h3>
        {boards.map((board, index) => (
          <li
            key={index}
            className={`group relative py-3 pl-3 text-primary-gray ${
              state.name === boards[index].name
                ? "hover:text-white"
                : "hover:text-primary"
            }`}
          >
            {state.name === boards[index].name && (
              <div className="absolute top-1 -left-3 -z-30 h-[40px] w-full rounded-r-full bg-primary" />
            )}
            <button
              className="flex items-center justify-between"
              onClick={() =>
                dispatch({
                  type: BoardActionKind.PLATFORM,
                  payload: boards[index],
                })
              }
            >
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                className={` 
                ${
                  state.name === boards[index].name
                    ? "fill-white"
                    : "fill-primary-gray group-hover:fill-primary"
                }
                `}
              >
                <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
              </svg>
              <span
                className={`ml-4 transition duration-75 ease-in hover:font-bold ${
                  state.name === boards[index].name && "font-bold text-white"
                }`}
              >
                {board.name}
              </span>
            </button>
          </li>
        ))}

        <li className="group relative py-3 pl-3 text-primary-gray">
          <button
            className=" flex items-center space-x-4"
            onClick={() =>
              dispatchModal({
                type: ModalActionType.ADDBOARD,
              })
            }
          >
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary-gray group-hover:fill-primary"
            >
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>

            <span className="flex items-center space-x-2 transition duration-75 ease-in hover:font-bold hover:text-primary">
              <span>+</span>
              <span>Create New Board</span>
            </span>
          </button>
        </li>
        <li className="my-2 flex items-center justify-center rounded-lg bg-secondary-gray py-2">
          <Switchbuton />
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
