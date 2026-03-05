import { drizzle } from "drizzle-orm/node-postgres";
import {
  boards,
  columns,
  tasks,
  subtasks,
  boardsRelations,
  columnsRelations,
  tasksRelations,
  subtasksRelations,
} from "./schema";
import "dotenv/config";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    boards,
    columns,
    tasks,
    subtasks,
    boardsRelations,
    columnsRelations,
    tasksRelations,
    subtasksRelations,
  },
});
