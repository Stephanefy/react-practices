import "dotenv/config";
import type { Task } from "../types/db/domain";
import path from "path";
import bun from "bun";
import { boards, columns, subtasks, tasks } from "../src/db/schema";
import { db } from "../src/db/db";

type SeedFile = {
  boards: {
    id: string;
    name: string;
    columns: {
      id: string;
      name: string;
      tasks: Task[];
    }[];
  }[];
};

const main = async () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const file = await bun.file(filePath).json();
  const seedFile = file as SeedFile;

  for (const board of seedFile.boards) {
    await db.insert(boards).values({
      id: board.id,
      name: board.name,
    });
    for (const column of board.columns) {
      await db.insert(columns).values({
        id: column.id,
        name: column.name,
        boardId: board.id,
      });
      for (const task of column.tasks) {
        const taskId = task.id ?? crypto.randomUUID();
        await db.insert(tasks).values({
          id: taskId,
          name: task.title ?? null,
          columnId: column.id,
        });
        for (const subtask of task.subtasks ?? []) {
          await db.insert(subtasks).values({
            id: subtask.id ?? crypto.randomUUID(),
            name: subtask.title,
            taskId,
          });
        }
      }
    }
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
