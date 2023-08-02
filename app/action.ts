"use server";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users, todolists } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NewTodo } from "@/db";

const queryClient = postgres(
  "postgres://user:password@0.0.0.0:54322/tododatabase"
);
const db: PostgresJsDatabase = drizzle(queryClient);

export const addTodoList = async (title: string, authorId: number) => {
  const result = await db
    .insert(todolists)
    .values({ title, authorId })
    .returning({ id: todolists.id });

  revalidatePath("/");
  revalidatePath("/new");
  revalidatePath("/[id]");

  // redirect(`/${result[0].id}`);
};

export const deleteTodoListOrTask = async (
  listId: number | string,
  todoId?: number | string
) => {
  if (todoId) {
    todoId = typeof todoId === "string" ? parseInt(todoId) : todoId;
    await db.delete(todos).where(eq(todos.id, todoId));

    revalidatePath(`/${listId}`);
    return;
  }

  if (typeof listId === "string") listId = parseInt(listId);

  await db.delete(todos).where(eq(todos.listId, listId));
  await db.delete(todolists).where(eq(todolists.id, listId));

  revalidatePath(`/`);
};

export const addNewTask = async (todo: NewTodo) => {
  const result = await db.insert(todos).values(todo).returning();
  const listId = result[0].listId;
  revalidatePath(`/${listId}`);

  // can redirect and have a middleware to do stuff
  // check where the original url coming from
  // redirect(`/${listId}`);
};

export const editListOrTodo = async (
  listId: number | string,
  newContent: string,
  todoId?: number | string
) => {
  if (listId === 0) throw new Error("Invalid listId passed into edit function");

  if (typeof listId === "string") listId = parseInt(listId);

  if (todoId) {
    todoId = typeof todoId === "string" ? parseInt(todoId) : todoId;

    await db
      .update(todos)
      .set({ content: newContent })
      .where(eq(todos.id, todoId));

    revalidatePath(`/${listId}`);
    return;
  }

  await db
    .update(todolists)
    .set({ title: newContent })
    .where(eq(todolists.id, listId));

  revalidatePath(`/${listId}`);
};

export const setCompleted = async (id: number, listId: number) => {
  await db.update(todos).set({ completed: true }).where(eq(todos.id, id));

  revalidatePath(`/${listId}`);
};
