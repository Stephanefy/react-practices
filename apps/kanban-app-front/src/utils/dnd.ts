import React from 'react';
import { Column, Task } from '../types';

export const initDrag = (e: React.DragEvent<HTMLDivElement>, tasks: Task[]) => {
  const taskId = (e.currentTarget as HTMLDivElement).getAttribute(
    'data-task-id'
  );

  const sourceColumnName =
    e.currentTarget.parentElement!.parentElement!.id.split('_')[1];

  const task = tasks.find(t => t.id === taskId);
  if (task) {
    // Store task data in dataTransfer instead of state
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('application/json', JSON.stringify(task));
    // Keep this for visual feedback only
  }

  return task;
};

export const getClampedIdx = (
  cardElement: Element,
  hoverClientY: number,
  hoverMiddleY: number,
  tasks: Task[]
) => {
  if (cardElement) {
    const orderIdx = parseInt(
      cardElement.getAttribute('data-orderidx') || '0',
      10
    );

    // 3. Compare relative values
    // This is mathematically identical but handles CSS transforms/scrolls more consistently
    const isDropAbove = hoverClientY < hoverMiddleY;

    const dropIndex = isDropAbove ? orderIdx : orderIdx + 1;
    // Clamp to valid range [0, tasks.length - 1]
    const clampedIndex = Math.min(dropIndex, tasks.length - 1);

    return clampedIndex;
  }
};

export const getUpdatedReorderedColumn = (
  sourceColumn: Column,
  draggedTaskIndex: number,
  validDropIndex: number,
  currentBoard: any
) => {
  if (draggedTaskIndex === -1) return;

  // Swap tasks at draggedTaskIndex and validDropIndex
  const reorderedTasks = [...sourceColumn!.tasks];
  [reorderedTasks[draggedTaskIndex], reorderedTasks[validDropIndex]] = [
    reorderedTasks[validDropIndex],
    reorderedTasks[draggedTaskIndex],
  ];

  // Update the board with reordered tasks
  const updatedColumn = {
    ...currentBoard,
    columns: currentBoard.columns.map((col: Column) =>
      col.id === sourceColumn!.id ? { ...col, tasks: reorderedTasks } : col
    ),
  };

  return updatedColumn;
};
