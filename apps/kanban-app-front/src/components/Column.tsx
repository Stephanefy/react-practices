import Kanbancard from './Kanbancard';
import type { Column } from '../context/AppContext';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import CrossSvg from './svg/CrossSvg';
import { AppContext } from '../context/AppContext';

interface ColumnProps {
  column: Column;
  index: number;
}

const Column = forwardRef<HTMLElement, ColumnProps>(
  (props: ColumnProps, ref) => {
    const {
      deleteColumnFromCurrentBoard,
      setCurrentColumn,
      currentSelectedColumn,
    } = useContext(AppContext);

    const [isEditingColumn, setIsEditingColumn] = useState<boolean>(false);
    const [newColumnName, setNewColumnName] = useState<string>(
      props.column.name
    );

    // need to refactor this logic
    useEffect(() => {
      setCurrentColumn(props.column.id, newColumnName);
    }, [newColumnName]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setIsEditingColumn(false);
      }
      if (e.key === 'Escape') {
        setIsEditingColumn(false);
      }
    };

    const updateColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        e.currentTarget.value.length > 20 ||
        e.currentTarget.value.length < 0
      ) {
        return;
      }
      setNewColumnName(e.currentTarget.value);
    };

    console.log('currentSelectedColumn', currentSelectedColumn);
    return (
      <section
        ref={ref}
        className={`mr-4 w-64 ${
          currentSelectedColumn?.id === props.column.id
            ? 'rounded-lg bg-red-800/10 p-4'
            : ''
        }`}
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
              id={task.id}
              title={task.title}
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
