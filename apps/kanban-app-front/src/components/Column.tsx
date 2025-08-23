import Kanbancard from "./Kanbancard";
import type { Column } from "../context/BoardContext";
import { forwardRef } from "react";
import { nanoid } from "nanoid";

interface ColumnProps {
    column: Column;
    index: number;

 }

const Column = forwardRef<HTMLElement, ColumnProps>((props: ColumnProps, ref) => {
  return (
    <section ref={ref} className="mr-4 w-64">
    <h3 className="text-base text-primary-gray">
      <span
        className={`inline-block h-4 w-4 ${
          props.index === 0
            ? "bg-todo-column"
            : props.index === 1
            ? "bg-doing-column"
            : "bg-done-column"
        }  mr-2 rounded-full`}
      ></span>
      <span>{props.column.name}</span>
      <span className="ml-2 inline-block">
        ({props.column.tasks.length})
      </span>
    </h3>
    <div className="flex flex-col">
      {props.column.tasks.map((task, index) => (
        <Kanbancard
          id={nanoid()}
          title={task.title}
          description={task.description}
          status={task.status}
          subtasks={task.subtasks}
        />
      ))}
    </div>
  </section>
  )
});

export default Column;