import { useState } from "react";

import { Board } from "../context/AppContext";
import IconBoard from "../assets/icon-board.svg";
import VerticalElipsis from "../assets/icon-vertical-ellipsis.svg";
import RightContext from "./RightContextMenu";

export default function BoardItemLink({
  board,
  selectBoard,
}: {
  board: Board;
  selectBoard: (board: Board) => void;
}) {
  const [showContext, setShowContext] = useState<boolean>(false);

  const handleShowContext = () => {
    setShowContext(!showContext);
  };

  return (
    <li key={board.id} className="relative py-3 text-primary-gray hover:text-primary">
      <button onClick={() => selectBoard(board)}>
        <img src={IconBoard} className="mr-4 inline-block" />
        <span>{board.name}</span>
      </button>
      <button
        className="absolute right-5 top-0 translate-y-1/2"
        onClick={handleShowContext}
      >
        <img src={VerticalElipsis} alt="" />
      </button>
      {showContext && <RightContext setShowContext={setShowContext}/>}
    </li>
  );
}
