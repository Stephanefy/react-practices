import { useContext, useRef, useState, useEffect } from "react";
import data from "../assets/data.json";
import Kanbancard from "./Kanbancard";
import PortalModal from "./modals/Modal";
import { ModalActionType, ModalContext } from "../context/ModalContext";
import MobileMenu from "./MobileMenu";
import TaskDetails from "./TaskDetails";
import { nanoid } from "nanoid";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import AddBoard from "./AddBoard";
import EditBoard from "./EditBoard";
import clsx from "clsx";
import Column from "./Column";
import { AppContext } from "../context/AppContext";

type Props = {
  setSidebarHeight: (height: number) => void;
  hideSideBar: boolean;
};

const Board = (props: Props) => {
  const { currentBoard, addColumnToCurrentBoard } = useContext(AppContext);
  const { state: showModal, dispatch: setShowModal } = useContext(ModalContext);

  const boardsListRef = useRef<HTMLElement>(null);

  const [boardsListHeight, setBoardingListHeight] = useState<number>(0);

  useEffect(() => {
    console.log("hide sidebar", props.hideSideBar);

    if (boardsListRef.current) {
      props.setSidebarHeight(boardsListRef?.current?.offsetHeight);

      setBoardingListHeight(boardsListRef?.current?.offsetHeight);
    }
  }, [currentBoard?.columns]);

  const { boards: jsonBoards } = data;


  const addNewColumn = () => {
    addColumnToCurrentBoard("New Column");
  };

  let currentOpenModal;

  return (
    <>
      <div
        className={clsx(
          "flex flex-1 min-h-screen overflow-hidden bg-secondary-gray text-5xl md:px-16 pt-[150px] pb-16",
          {
            "items-start": (currentBoard?.columns.length ?? 0) > 0,
            "items-center": (currentBoard?.columns.length ?? 0) === 0,
            "justify-center": (currentBoard?.columns.length ?? 0) === 0,
            "justify-start": (currentBoard?.columns.length ?? 0) > 0,
            "-translate-x-52 transform duration-300 ease-in": props.hideSideBar,
            "translate-x-0 transform duration-300 ease-in": !props.hideSideBar,
          }
        )}
      >
        <div
          className={`grid  grid-flow-col p-4 lg:p-0 ${
            currentBoard?.columns.length && "overflow-auto"
          }`}
        >
          {(currentBoard?.columns.length ?? 0) > 0 ? (
            currentBoard?.columns.map((column, index) => (
              <Column key={column.id} column={column} index={index} ref={boardsListRef} />
            ))
          ) : (
            <div className="mx-auto flex w-full flex-col md:w-full md:items-center md:justify-center">
              <p className="text-center text-lg font-bold text-primary-gray">
                This board is empty. Create a new column to get started.
              </p>
              <div className="mx-auto">
                <button
                  className="mt-4 rounded-full bg-primary px-4 py-2 text-base text-white"
                  onClick={() => addNewColumn()}
                >
                  + Add New Column
                </button>
              </div>
            </div>
          )}
          {(currentBoard?.columns.length ?? 0) > 0 ? (
            <section className="mr-4 flex w-72 min-h-screen items-center justify-center rounded-lg bg-[#E9EFFA] pb-4">
              <button
                className="text-lg"
                onClick={() =>
                  addNewColumn()
                }
              >
                <span className="text-primary-gray">+</span>
                <span className="text-primary-gray font-semibold hover:text-primary">New Column</span>
              </button>
            </section>
          ) : null}
        </div>
      </div>
      <PortalModal isOpen={showModal.showModal === 1} onClose={setShowModal}>
        <MobileMenu />
      </PortalModal>
      <PortalModal isOpen={showModal.showModal === 2} onClose={setShowModal}>
        <TaskDetails />
      </PortalModal>
      <PortalModal isOpen={showModal.showModal === 3} onClose={setShowModal}>
        <AddTask />
      </PortalModal>
      <PortalModal isOpen={showModal.showModal === 4} onClose={setShowModal}>
        <EditTask />
      </PortalModal>
      <PortalModal isOpen={showModal.showModal === 5} onClose={setShowModal}>
        <AddBoard />
      </PortalModal>
      <PortalModal isOpen={showModal.showModal === 6} onClose={setShowModal}>
        <EditBoard />
      </PortalModal>
    </>
  );
};

export default Board;
