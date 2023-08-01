import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users, todolists } from "./schema/schema";
import * as schema from "./schema/schema";
import { InferModel, eq } from "drizzle-orm";

const queryClient = postgres(
  "postgres://user:password@0.0.0.0:54322/tododatabase"
);
const db: PostgresJsDatabase = drizzle(queryClient);

const getUser = async () => {
  const results = await db.select().from(users);
  console.log({ results });

  return results;
};

export type NewTodo = InferModel<typeof todos, "insert">;
export type Todo = InferModel<typeof todos>;

export type TodoList = InferModel<typeof todolists>;
export type NewTodoList = InferModel<typeof todolists, "insert">;

export type Users = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

const todo: NewTodo = {
  authorId: 1,
  listId: 1,
  title: "Todo 1",
  content: "This is my first todo",
};

const todoList = {
  authorId: 1,
  title: "Todo 1",
};

const addTodo = async (todo: NewTodo) => {
  await db.insert(todos).values(todo);
};

export const addTodoList = async ({ title, authorId }: NewTodoList) => {
  const result = await db
    .insert(todolists)
    .values({ title, authorId })
    .returning({ id: todolists.id });

  return result[0];
};

export const getAllTodos = async (listId: number) => {
  const result = await db.select().from(todos).where(eq(todos.listId, listId));
  console.log({ result });

  return result;
};

export const getAllTodoLists = async (userId: number) => {
  const result = await db
    .select()
    .from(todolists)
    .where(eq(todolists.authorId, userId));

  return result;
};

export const getATodoList = async (listId: number) => {
  const result = await db
    .select()
    .from(todolists)
    .where(eq(todolists.id, listId));

  return result[0];
};

// getUser().catch((err) => console.log({ err }));
// addTodo(todo).catch((err) => console.log("add todo error: ", err));
// getAllTodos(1).catch((err) => console.log("get all todo error: ", err));
