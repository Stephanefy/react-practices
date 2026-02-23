import React from 'react';
import { Board, Column, Task } from '../types';

export const initDragTask = (
  e: React.DragEvent<HTMLDivElement>,
  tasks: Task[]
) => {
  e.stopPropagation();
  const taskId = (e.currentTarget as HTMLDivElement).getAttribute(
    'data-task-id'
  );

  const task = tasks.find(t => t.id === taskId);
  if (task) {
    // Store task data in dataTransfer instead of state
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('application/json', JSON.stringify(task));
    // Keep this for visual feedback only
  }

  return task;
};

export const initDragColumn = (
  e: React.DragEvent<HTMLDivElement>,
  columns: Column[]
) => {
  e.stopPropagation();
  const columnId = (e.currentTarget as HTMLDivElement).getAttribute('id');

  const column = columns.find(col => col.id === columnId);
  if (columnId) {
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('application/json', JSON.stringify(column));
    // Keep this for visual feedback only
  }
  return column;
};
export const getClampedIdx = (
  cardElement: Element,
  hoverClientY: number,
  hoverMiddleY: number,
  tasks: Task[] | Column[]
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

export const getUpdatedReorderedBoard = (
  sourceBoard: Board,
  draggedColumnIndex: number,
  validDropIndex: number,
  currentBoard: Board
) => {
  if (draggedColumnIndex === -1) return;

  console.log('draggedColumnIndex', draggedColumnIndex);
  console.log('validDropIndex', validDropIndex);

  // Swap columns at draggedColumnIndex and validDropIndex
  const reorderedColumns = [...sourceBoard.columns];
  [reorderedColumns[draggedColumnIndex], reorderedColumns[validDropIndex]] = [
    reorderedColumns[validDropIndex],
    reorderedColumns[draggedColumnIndex],
  ];
  const updatedBoard = {
    ...currentBoard,
    columns: reorderedColumns,
  };
  return updatedBoard;
};
