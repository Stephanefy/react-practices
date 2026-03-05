import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { boards, columns, tasks } from "./db/schema";
import type { BunRequest } from "bun";
import { and, eq } from "drizzle-orm";
import type { Task } from "../types/db/domain";
import { db } from "./db/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function corsJson(data: unknown) {
  return Response.json(data, {
    headers: corsHeaders,
  });
}

const server = Bun.serve({
  port: 8080,
  async fetch(req: Request) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    return new Response(JSON.stringify({ message: "Hello from Bun" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
  routes: {
    "/api/boards": {
      GET: async () => {
        const boardsData = await db.query.boards.findMany({
          with: {
            columns: {
              with: {
                tasks: {
                  with: {
                    subtasks: true,
                  },
                },
              },
            },
          },
        });

        return corsJson(boardsData);
      },
      POST: async (req: Request) => {
        const body = await req.json();
        const board = await db
          .insert(boards)
          .values(body as { id: string; name: string });
        return corsJson(board);
      },
    },
    "/api/boards/:id": {
      GET: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const board = await db
          .select()
          .from(boards)
          .where(eq(boards.id, boardId));
        return corsJson(board);
      },
      PUT: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const body = await req.json();
        const board = await db
          .update(boards)
          .set(body as { name: string })
          .where(eq(boards.id, boardId));
        return corsJson(board);
      },
      DELETE: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const board = await db.delete(boards).where(eq(boards.id, boardId));
        return corsJson(board);
      },
    },
    "/api/boards/:id/columns": {
      GET: async () => {
        const columnsData = await db.select().from(columns);
        return corsJson(columnsData);
      },
      POST: async (req: Request) => {
        const body = await req.json();
        const column = await db
          .insert(columns)
          .values(body as { id: string; name: string; boardId: string });
        return corsJson(column);
      },
    },
    "/api/boards/:id/columns/:columnId": {
      GET: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const column = await db
          .select()
          .from(columns)
          .where(and(eq(columns.id, columnId), eq(columns.boardId, boardId)));
        return corsJson(column);
      },
      PUT: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const body = await req.json();
        const column = await db
          .update(columns)
          .set(body as { name: string })
          .where(and(eq(columns.id, columnId), eq(columns.boardId, boardId)));
        return corsJson(column);
      },
      DELETE: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const column = await db
          .delete(columns)
          .where(and(eq(columns.id, columnId), eq(columns.boardId, boardId)));
        return corsJson(column);
      },
    },
    "/api/boards/:id/columns/:columnId/tasks": {
      GET: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const tasksData = await db
          .select()
          .from(tasks)
          .where(and(eq(tasks.columnId, columnId), eq(columns.id, columnId)));
        return corsJson(tasksData);
      },
      POST: async (req: Request) => {
        const body = await req.json();
        const task = await db
          .insert(tasks)
          .values(body as { id: string; name: string; columnId: string });
        return corsJson(task);
      },
    },
    "/api/boards/:id/columns/:columnId/tasks/:taskId": {
      GET: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const taskId = req.params.taskId as string;
        const task = await db
          .select()
          .from(tasks)
          .where(and(eq(tasks.id, taskId), eq(tasks.columnId, columnId)));
        return corsJson(task);
      },
      PUT: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const taskId = req.params.taskId as string;
        const body = await req.json();
        const task = await db
          .update(tasks)
          .set(body as { name: string })
          .where(and(eq(tasks.id, taskId), eq(tasks.columnId, columnId)));
        return corsJson(task);
      },
      DELETE: async (req: BunRequest) => {
        const boardId = req.params.id as string;
        const columnId = req.params.columnId as string;
        const taskId = req.params.taskId as string;
        const task = await db
          .delete(tasks)
          .where(and(eq(tasks.id, taskId), eq(tasks.columnId, columnId)));
        return corsJson(task);
      },
    },
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
});

console.log(`Server running at ${server.url}`);
