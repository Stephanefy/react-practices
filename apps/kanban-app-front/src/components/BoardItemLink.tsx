import { useContext, useState } from 'react';

import { Board } from '../context/AppContext';
import IconBoard from '../assets/icon-board.svg';
import VerticalElipsis from '../assets/icon-vertical-ellipsis.svg';
import RightContextMenu from './RightContextMenu';
import { AppContext } from '../context/AppContext';

export type EditAction = 'rename' | 'delete' | '';

export type CurrentEditingBoard = {
  id: string;
  editAction: EditAction;
};

export default function BoardItemLink({
  board,
  selectBoard,
}: {
  board: Board;
  selectBoard: (board: Board) => void;
}) {
  const { renameCurrentBoard } = useContext(AppContext);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [chosenEdit, setChosenEdit] = useState<CurrentEditingBoard>({
    id: '',
    editAction: '',
  });
  const [currentBoardName, setCurrentBoardName] = useState<string>(board.name);

  const handleShowContext = () => {
    setShowContext(!showContext);
  };

  const onRename = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setChosenEdit({ id: '', editAction: '' });
      renameCurrentBoard(currentBoardName);
    }
    if (e.key === 'Escape') {
      setChosenEdit({ id: '', editAction: '' });
    }
  };

  return (
    <li
      key={board.id}
      className="relative py-3 text-primary-gray hover:text-primary"
    >
      <button onClick={() => selectBoard(board)} className="flex">
        <img src={IconBoard} className="mr-4 inline-block h-6 w-6" />
        {chosenEdit.id === board.id && chosenEdit.editAction === 'rename' ? (
          <span>
            <input
              type="text"
              value={currentBoardName}
              onChange={e => setCurrentBoardName(e.target.value)}
              onKeyDown={onRename}
              className="overflow inline h-6 w-auto max-w-[150px] -translate-x-1 transform border-none bg-transparent outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
            />
          </span>
        ) : (
          <span>{currentBoardName}</span>
        )}
      </button>

      <button
        className="absolute right-5 top-0 translate-y-1/2"
        onClick={handleShowContext}
      >
        <img src={VerticalElipsis} alt="" />
      </button>
      {showContext && (
        <RightContextMenu
          setShowContext={setShowContext}
          setChosenEdit={setChosenEdit}
          boardId={board.id}
        />
      )}
    </li>
  );
}
