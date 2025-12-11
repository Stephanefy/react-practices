import Kanbancard from './Kanbancard';
import { type Column, type Task } from '../types';
import { forwardRef, useContext, useState } from 'react';
import CrossSvg from './svg/CrossSvg';
import { AppContext } from '../context/AppContext';
import {
  getClampedIdx,
  getUpdatedReorderedColumn,
  initDrag,
} from '../utils/dnd';

interface ColumnProps {
  column: Column;
  columns: Column[];
  index: number;
}

const Column = forwardRef<HTMLElement, ColumnProps>(
  (props: ColumnProps, ref) => {
    const {
      deleteColumnFromCurrentBoard,
      setCurrentColumn,
      currentBoard,
      updateCurrentBoardInBoards,
    } = useContext(AppContext);

    const [isEditingColumn, setIsEditingColumn] = useState<boolean>(false);
    const [newColumnName, setNewColumnName] = useState<string>(
      props.column.name
    );
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (newColumnName.length === 0) {
        setCurrentColumn(props.column.id, props.column.name);
      }

      if (e.key === 'Enter') {
        setIsEditingColumn(false);

        setCurrentColumn(props.column.id, newColumnName);
      }
      if (e.key === 'Escape') {
        setIsEditingColumn(false);
      }
    };

    const updateColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.value.length > 20) {
        return;
      }
      setNewColumnName(e.currentTarget.value);
    };

    const changeIsHoveredStyle = () => {
      setIsHovered(prev => !prev);
    };

    const onDragStart: React.DragEventHandler<HTMLDivElement> = e => {
      const task = initDrag(e, props.column.tasks);
      setDraggedTask(task!);
    };

    const onDragOver: React.DragEventHandler<HTMLDivElement> = e => {
      e.preventDefault();

      const cardElement = (e.currentTarget as HTMLElement).closest(
        '[data-orderidx]'
      );

      if (!cardElement) return;
      const rect = cardElement.getBoundingClientRect();

      // 1. Get mouse position relative to the element's top edge
      const hoverClientY = e.clientY - rect.top;

      // 2. Calculate the midpoint height of the element
      const hoverMiddleY = rect.height / 2;

      const clampedIndex = getClampedIdx(
        cardElement,
        hoverClientY,
        hoverMiddleY,
        props.column.tasks
      );

      setDragOverIndex(clampedIndex!);
    };

    const onDragEnd: React.DragEventHandler<HTMLDivElement> = e => {
      setDraggedTask(null);
      setDragOverIndex(null);
    };

    const onDragDrop: React.DragEventHandler<HTMLDivElement> = e => {
      e.preventDefault();
      e.stopPropagation();

      const draggedTaskData = e.dataTransfer!.getData('application/json');

      if (!draggedTaskData || !currentBoard) return;

      const draggedTaskFromEvent = JSON.parse(draggedTaskData) as Task;

      const columnName = e.currentTarget!.id.split('-')[1];

      const targetColumn = currentBoard.columns.find(
        column => column.name === columnName
      );

      if (!targetColumn) return;

      const sourceColumn = currentBoard.columns.find(col =>
        col.tasks.some(t => t.id === draggedTaskFromEvent.id)
      );

      if (sourceColumn!.id === targetColumn.id) {
        // REORDER LOGIC - same column, swap tasks by index

        if (dragOverIndex === null) return;

        const validDropIndex = Math.min(
          dragOverIndex,
          sourceColumn!.tasks.length - 1
        );

        const draggedTaskIndex = sourceColumn!.tasks.findIndex(
          t => t.id === draggedTaskFromEvent.id
        );

        if (draggedTaskIndex === validDropIndex) {
          setDragOverIndex(null);
          return;
        }

        const updatedBoard = getUpdatedReorderedColumn(
          sourceColumn!,
          draggedTaskIndex,
          validDropIndex,
          currentBoard
        );

        updateCurrentBoardInBoards(updatedBoard!);
        setDraggedTask(null);
        setDragOverIndex(null);
      } else {
        // DRAG TO ANOTHER COLUMN
        // single update to counter React batch udpate
        if (!sourceColumn || sourceColumn.id === targetColumn.id) return;

        const updatedBoard = {
          ...currentBoard,
          columns: currentBoard.columns.map(col => {
            if (col.id === sourceColumn.id) {
              return {
                ...col,
                tasks: col.tasks.filter(t => t.id !== draggedTaskFromEvent.id),
              };
            }
            if (col.id === targetColumn.id) {
              return {
                ...col,
                tasks: [...col.tasks, draggedTaskFromEvent],
              };
            }
            return col;
          }),
        };
        updateCurrentBoardInBoards(updatedBoard);
        setDraggedTask(null);
      }
    };

    return (
      <section
        id={`column-${props.column.name}`}
        onDrop={onDragDrop}
        onDragOver={onDragOver}
        ref={ref}
        className={`mr-4 w-64 rounded-lg bg-red-800/10 p-4`}
        onMouseEnter={changeIsHoveredStyle}
        onMouseLeave={changeIsHoveredStyle}
      >
        <h3 className="flex justify-between text-base text-primary-gray">
          <div>
            <span
              className={`inline-block h-4 w-4 ${
                props.index === 0
                  ? 'bg-todo-column'
                  : props.index === 1
                    ? 'bg-doing-column'
                    : 'bg-done-column'
              } mr-2 rounded-full`}
            ></span>
            <span onDoubleClick={() => setIsEditingColumn(!isEditingColumn)}>
              {isEditingColumn ? (
                <input
                  onKeyDown={onKeyDown}
                  type="text"
                  className="h-6 w-[150px] border-none bg-transparent px-4 outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
                  value={newColumnName}
                  onChange={updateColumnName}
                />
              ) : (
                props.column.name
              )}
            </span>
            {!isEditingColumn && (
              <span className="ml-2 inline-block">
                ({props.column.tasks.length})
              </span>
            )}
          </div>
          <div>
            <span
              role="button"
              className="cursor-pointer"
              onClick={() => deleteColumnFromCurrentBoard(props.column.id)}
            >
              <CrossSvg />
            </span>
          </div>
        </h3>
        <div className="flex flex-col">
          {props.column.tasks.map((task, index) => (
            <Kanbancard
              key={task.id}
              columnId={props.column.id}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              order={task.order}
              id={task.id}
              title={task.title}
              draggedTask={draggedTask}
              description={task.description}
              status={task.status}
              subtasks={task.subtasks}
              orderIdx={index}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default Column;
