import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users, todolists } from "./schema/schema";
import { eq, sql } from "drizzle-orm";
import { NewTodoList, NewUser } from "@/app/types/db";

const queryClient = postgres(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@0.0.0.0:54322/${process.env.POSTGRES_DB}`
);
export const db: PostgresJsDatabase = drizzle(queryClient);

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

export const getATodo = async (todoId: number) => {
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

export const getATodoList = async (listId: number) => {
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
