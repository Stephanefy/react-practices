import { useState, MouseEvent, useContext } from 'react';
import { CurrentEditingBoard } from './BoardItemLink';
import { AppContext } from '../context/AppContext';

type RightContextProps = {
  boardId: string;
  setShowContext: (showContext: boolean) => void;
  setChosenEdit: (editAction: CurrentEditingBoard) => void;
};

function RightContextMenu({
  setShowContext,
  setChosenEdit,
  boardId,
}: RightContextProps) {
  const { deleteCurrentBoard } = useContext(AppContext);
  const [xYPosistion, setXyPosistion] = useState({ x: 0, y: 0 });
  const [chosen, setChosen] = useState<string>('');

  const showNav = (event: MouseEvent) => {
    event.preventDefault();
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setShowContext(true);
  };
  const hideContext = () => {
    setShowContext(false);
  };
  const selectEditAction = (selectedAction: 'rename' | 'delete') => {
    if (selectedAction === 'delete') {
      deleteCurrentBoard();
    }
    setChosen(selectedAction);
    setShowContext(false);
    setChosenEdit({ id: boardId, editAction: selectedAction });
  };
  return (
    <div className="absolute right-0 top-0 z-50 w-[200px] rounded-md border-2 border-primary-gray bg-white p-2 shadow-md">
      <div className="contextContainer relative" onContextMenu={showNav}>
        <div className="absolute right-0 top-0 translate-y-1/2">
          <button
            className="absolute right-0 top-0 p-1"
            aria-label="Close context menu"
            onClick={() => {
              hideContext();
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="4"
                x2="12"
                y2="12"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="4"
                x2="4"
                y2="12"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {chosen && <h1>"{chosen}" is chosen</h1>}
        <div
          style={{ top: xYPosistion.y, left: xYPosistion.x }}
          className="rightClick text-md text-primary-gray"
        >
          <div
            className="menuElement text-primary-gray hover:text-primary"
            onClick={() => selectEditAction('rename')}
          >
            <span>Rename</span>
          </div>
          <div
            className="menuElement hover:text-primary"
            onClick={() => selectEditAction('delete')}
          >
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RightContextMenu;
