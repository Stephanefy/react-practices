import Kanbancard from './Kanbancard';
import { type Column, type Task } from '../types';
import { forwardRef, useContext, useState } from 'react';
import CrossSvg from './svg/CrossSvg';
import { AppContext } from '../context/AppContext';
import { getClampedIdx, initDrag } from '../utils/dnd';
import { useDnd } from '../hooks/useDnd';

interface ColumnProps {
  column: Column;
  columns: Column[];
  index: number;
}

const Column = forwardRef<HTMLElement, ColumnProps>(
  (props: ColumnProps, ref) => {
    const [isEditingColumn, setIsEditingColumn] = useState<boolean>(false);
    const [newColumnName, setNewColumnName] = useState<string>(
      props.column.name
    );
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const {
      onDragDrop,
      onDragOver,
      onDragEnd,
      onDragStart,
      draggedTask,
      deleteColumnFromCurrentBoard,
      setCurrentColumn,
    } = useDnd(props.column);

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

    return (
      <section
        id={`column-${props.column.name}`}
        onDrop={onDragDrop}
        onDragOver={onDragOver}
        onDrag={onDragEnd}
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
