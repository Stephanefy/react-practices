import React, { useContext, useEffect } from 'react';
import IconBoard from '../assets/icon-board.svg';
import SwitchButton from './Switchbutton';
import IconHideSideBar from '../assets/icon-hide-sidebar.svg';
import IconShowSideBar from '../assets/icon-show-sidebar.svg';
import { nanoid } from 'nanoid';
import { AppContext } from '../context/AppContext';
import { type Board } from '../types';
import BoardItemLink from './BoardItemLink';

type Props = {
  sidebarHeight: number;
  setHideSidebar: (hideSidebar: boolean) => void;
  hideSidebar: boolean;
};

const Sidebar = (props: Props) => {
  const { boards, setBoards, currentBoard, setCurrentBoard } =
    useContext(AppContext);

  const addNewBoard = () => {
    const newBoard = { id: nanoid(), name: 'New Board', columns: [] };
    setBoards([...boards, newBoard]);
  };

  const selectBoard = (board: Board) => {
    setCurrentBoard(board);
  };

  return (
    <>
      <div
        className={`relative hidden md:block ${
          !props.hideSidebar
            ? 'width-[261px] duration-300 ease-in lg:basis-1/6'
            : 'width-[261px] -translate-x-full transform duration-300 ease-in lg:basis-1/6'
        } z-30 flex flex-col justify-between border-r-2 bg-white pt-[96px]`}
      >
        <ul className="flex-2 h-3/4 w-full pl-3">
          <h3 className="p-3 font-bold uppercase text-primary-gray">
            all boards
          </h3>
          {boards.map(board => (
            <BoardItemLink
              key={board.id}
              board={board}
              selectBoard={selectBoard}
            />
          ))}
          <li className="py-3 text-primary-gray hover:text-primary">
            <button onClick={addNewBoard}>
              <img src={IconBoard} className="mr-4 inline-block" />

              <span className="">+ Create New Board</span>
            </button>
          </li>
        </ul>
        <div className="relative bottom-0 mb-0 mt-16">
          <SwitchButton />
          <div className="fixed bottom-0 my-4 pl-3">
            <img
              src={IconHideSideBar}
              alt="hide sidebar"
              className="mr-3 inline-block"
            />
            <button
              onClick={() => props.setHideSidebar(true)}
              className="mt-2 pb-2"
            >
              <span className="text-primary-gray">Hide sidebar</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-10 rounded-r-full bg-primary p-6 duration-300 ease-in ${
          !props.hideSidebar &&
          '-translate-x-full transform duration-300 ease-in'
        } z-50`}
      >
        <button onClick={() => props.setHideSidebar(false)}>
          <img src={IconShowSideBar} style={{ color: 'white' }} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
