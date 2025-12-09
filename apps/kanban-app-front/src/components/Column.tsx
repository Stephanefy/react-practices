import Kanbancard from './Kanbancard';
import { type Column, type Task } from '../types';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import CrossSvg from './svg/CrossSvg';
import { AppContext } from '../context/AppContext';

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
      currentSelectedColumn,
      currentBoard,
      updateCurrentBoardInBoards,
    } = useContext(AppContext);

    const [isEditingColumn, setIsEditingColumn] = useState<boolean>(false);
    const [newColumnName, setNewColumnName] = useState<string>(
      props.column.name
    );
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

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
      const taskId = (e.currentTarget as HTMLDivElement).getAttribute(
        'data-task-id'
      );
      const task = props.column.tasks.find(t => t.id === taskId);
      if (task) {
        // Store task data in dataTransfer instead of state
        e.dataTransfer!.effectAllowed = 'move';
        e.dataTransfer!.setData('application/json', JSON.stringify(task));
        setDraggedTask(task); // Keep this for visual feedback only
      }
    };

    const onDragOver: React.DragEventHandler<HTMLDivElement> = e => {
      e.preventDefault();
    };

    const onDragEnd: React.DragEventHandler<HTMLDivElement> = e => {
      setDraggedTask(null);
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
              id={task.id}
              title={task.title}
              draggedTask={draggedTask}
              description={task.description}
              status={task.status}
              subtasks={task.subtasks}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default Column;
