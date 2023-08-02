import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users, todolists } from "./schema/schema";
import { InferModel, eq, sql } from "drizzle-orm";

const queryClient = postgres(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@0.0.0.0:54322/${process.env.POSTGRES_DB}`
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
  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.listId, listId))
    .orderBy(todos.id);
  console.log({ result });

  return result;
};

export const getATodo = async (todoId: number | string) => {
  if (typeof todoId === "string") {
    todoId = parseInt(todoId);
  }

  if (isNaN(todoId)) {
    throw new Error("Invalid argument passed in getATodo function");
  }

  const result = await db.select().from(todos).where(eq(todos.id, todoId));

  return result[0];
};

export const getAllTodoLists = async (userId: number) => {
  const result = await db
    .select()
    .from(todolists)
    .where(eq(todolists.authorId, userId));

  return result;
};

export const getATodoList = async (listId: number | string) => {
  if (typeof listId === "string") {
    listId = parseInt(listId);
  }

  if (isNaN(listId)) {
    throw new Error("Invalid argument passed in getATodoList function");
  }
  const result = await db
    .select()
    .from(todolists)
    .where(eq(todolists.id, listId));

  return result[0];
};

export const getOrCreateUser = async (user: NewUser) => {
  const result = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = ${user.email}`);

  if (result) {
    return result[0];
  }

  const newUser = await db.insert(users).values(user).returning();
  return newUser[0];
};
