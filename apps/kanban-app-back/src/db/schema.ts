import { pgTable, text, integer } from "drizzle-orm/pg-core";

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
  columnId: text("column_id").references(() => columns.id),
});

export const subtasks = pgTable("subtasks", {
  id: text("id").primaryKey(),
  name: text("name"),
  taskId: text("task_id").references(() => tasks.id),
});
