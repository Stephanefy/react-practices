import { useContext, useState } from 'react';
import logoDark from '../assets/logo-dark.svg';
import logoMobile from '../assets/logo-mobile.svg';
import VerticalElipsis from '../assets/icon-vertical-ellipsis.svg';
import ChevronDown from '../assets/icon-chevron-down.svg';
import ChevronUp from '../assets/icon-chevron-up.svg';
import AddTaskMobile from '../assets/icon-add-task-mobile.svg';
import { ModalActionType, ModalContext } from '../context/ModalContext';
import { AppContext } from '../context/AppContext';

type Props = {};

const Navbar = (props: Props) => {
  const { currentBoard } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const { state, dispatch } = useContext(ModalContext);

  const handleShowMenuModal = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) dispatch({ type: ModalActionType.NONEOPEN });
    if (showDropdown) dispatch({ type: ModalActionType.MOBILEMENU });
  };

  return (
    <nav className="fixed top-0 z-[60] flex h-[96px] w-full items-center bg-white">
      <div className="md:width-[261px] flex h-full items-center pl-3 pr-6 md:border-r-2 lg:basis-1/6">
        <img className="hidden md:block" src={logoDark} alt="logo" />
        <img className="md:hidden" src={logoMobile} alt="logo" />
      </div>
      <ul className="mx-auto flex w-full basis-5/6 items-center justify-between md:px-3">
        <li className="md:text-1xl text-sm font-bold uppercase text-primary-black">
          {currentBoard?.name}
          <span className="ml-3 inline-block md:hidden">
            <button
              onClick={handleShowMenuModal}
              className="flex items-center gap-x-2"
            >
              {!showDropdown ? (
                <img src={ChevronUp} width={10} />
              ) : (
                <img src={ChevronDown} width={10} />
              )}
            </button>
          </span>
        </li>
        <li>
          <div className="flex items-center justify-between gap-x-4">
            <ul className="flex items-center">
              <li className="hidden md:block">
                <button
                  onClick={() => dispatch({ type: ModalActionType.ADDTASK })}
                  className="rounded-full bg-primary px-6 py-3 hover:bg-secondary"
                >
                  + Add new task
                </button>
              </li>
              <li className="md:hidden">
                <button
                  onClick={() => dispatch({ type: ModalActionType.ADDTASK })}
                  className="flex h-[32px] w-[48px] items-center justify-center rounded-full bg-secondary"
                >
                  <img src={AddTaskMobile} alt="add" />
                </button>
              </li>
              {currentBoard?.name && (
                <li className="ml-3">
                  <button
                    onClick={() => {
                      dispatch({ type: ModalActionType.EDITBOARD });
                    }}
                  >
                    <img src={VerticalElipsis} alt="" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
