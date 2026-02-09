import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  getClampedIdx,
  getUpdatedReorderedColumn,
  initDragTask,
  initDragColumn,
} from '../utils/dnd';
import { Board, Column, Task } from '../types/domain';
import { moveTaskBetweenColumns } from '../api/tasks/tasks';

export const useDnd = (element: Board | Column) => {
  const {
    deleteColumnFromCurrentBoard,
    setCurrentColumn,
    currentBoard,
    updateCurrentBoardInBoards,
  } = useContext(AppContext);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onDragDropTask: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();

    const draggedTaskData = e.dataTransfer!.getData('application/json');

    if (!draggedTaskData || !currentBoard) return;

    const draggedTaskFromEvent = JSON.parse(draggedTaskData) as Task;

    const targetColumn = element as Column;

    const sourceColumn = currentBoard.columns.find(col =>
      col.tasks.some(t => t.id === draggedTaskFromEvent.id)
    );

    if (sourceColumn!.id === targetColumn!.id) {
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

      // Update local state first for immediate UI feedback
      updateCurrentBoardInBoards(updatedBoard);

      // Persist to database with the same updated board
      moveTaskBetweenColumns(
        currentBoard.id,
        sourceColumn.id,
        targetColumn.id,
        draggedTaskFromEvent.id! as string,
        draggedTaskFromEvent,
        updatedBoard
      ).catch(error => {
        console.error('Failed to move task:', error);
        // Optionally: revert the state change if API fails
      });

      setDraggedTask(null);
      setDragOverIndex(null);
    }
  };

  const onDragEndTask: React.DragEventHandler<HTMLDivElement> = e => {
    setDraggedTask(null);
    setDragOverIndex(null);
  };

  const onDragStartTask: React.DragEventHandler<HTMLDivElement> = e => {
    if ('tasks' in element) {
      const task = initDragTask(e, element.tasks);
      setDraggedTask(task!);
    }
    return null;
  };

  const onDragOverTask: React.DragEventHandler<HTMLDivElement> = e => {
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

    const tasks = 'tasks' in element ? element.tasks : undefined;
    if (!tasks) return;

    const clampedIndex = getClampedIdx(
      cardElement,
      hoverClientY,
      hoverMiddleY,
      tasks
    );

    setDragOverIndex(clampedIndex!);
  };

  const onDragStartColumn = (e: React.DragEvent<HTMLDivElement>) => {
    const columns = 'columns' in element ? element.columns : undefined;

    const draggedColumn = initDragColumn(e, columns!);
  };

  const onDragOverColumn = () => {};
  const onDragEndColumn = () => {};
  const onDragDropColumn = () => {};
  return {
    isHovered,
    setIsHovered,
    draggedTask,
    setDraggedTask,
    dragOverIndex,
    setDragOverIndex,
    onDragDropTask,
    onDragEndTask,
    onDragStartTask,
    onDragOverTask,
    onDragStartColumn,
    onDragOverColumn,
    onDragEndColumn,
    onDragDropColumn,
    deleteColumnFromCurrentBoard,
    setCurrentColumn,
    currentBoard,
    updateCurrentBoardInBoards,
  };
};
