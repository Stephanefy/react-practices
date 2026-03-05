import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const boards = pgTable("boards", {
  id: text("id").primaryKey(),
  name: text("name"),
});

export const columns = pgTable("columns", {
  id: text("id").primaryKey(),
  name: text("name"),
  boardId: text("board_id").references(() => boards.id),
});

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  name: text("name"),
  order: integer("order"),
  title: text("title"),
  description: text("description"),
  status: text("status"),
  isCompleted: boolean("is_completed"),
  columnCategory: text("column_category"),
  columnId: text("column_id").references(() => columns.id),
});

export const subtasks = pgTable("subtasks", {
  id: text("id").primaryKey(),
  name: text("name"),
  isCompleted: boolean("is_completed"),
  taskId: text("task_id").references(() => tasks.id),
});

export const boardsRelations = relations(boards, ({ many }) => ({
  columns: many(columns),
}));

export const columnsRelations = relations(columns, ({ one, many }) => ({
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  column: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
  subtasks: many(subtasks),
}));

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}));
