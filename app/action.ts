"use server";

import { todos, todolists, users } from "@/db/schema/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NewTodo, NewUser } from "@/app/types/db";
import { db } from "@/db";

export const addTodoList = async (title: string, authorId: number) => {
  const result = await db
    .insert(todolists)
    .values({ title, authorId })
    .returning({ id: todolists.id });

  revalidatePath("/");
  revalidatePath("/new");
  revalidatePath("/[id]");

  return result[0];
};

export const deleteTodoListOrTask = async (
  listId: number,
  todoId: number = 0
) => {
  if (todoId) {
    await db.delete(todos).where(eq(todos.id, todoId));

    revalidatePath(`/${listId}`);
    return;
  }

  await db.delete(todos).where(eq(todos.listId, listId));
  await db.delete(todolists).where(eq(todolists.id, listId));

  revalidatePath(`/`);
};

export const addNewTask = async (todo: NewTodo) => {
  const result = await db.insert(todos).values(todo).returning();
  const listId = result[0].listId;
  revalidatePath(`/${listId}`);
};

export const editListOrTodo = async (
  listId: number,
  newContent: string,
  todoId?: number
) => {
  if (listId === 0) throw new Error("Invalid listId passed into edit function");

  if (todoId) {
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

export const getATodoList = async (listId: number) => {
  const result = await db
    .select()
    .from(todolists)
    .where(eq(todolists.id, listId));

  return result[0];
};

export const getAllTodoLists = async (userId: number) => {
  const result = await db
    .select()
    .from(todolists)
    .where(eq(todolists.authorId, userId));

  return result;
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
