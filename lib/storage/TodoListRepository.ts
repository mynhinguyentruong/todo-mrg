"use server";

import { Todo, TodoList } from "@/app/types/db";
import { db } from "@/db";
import { todolists, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function createTodoList(
  title: string,
  authorId: number
): Promise<{ id: number }> {
  return (
    await db
      .insert(todolists)
      .values({ title, authorId })
      .returning({ id: todolists.id })
  )[0];
}
export async function getOneTodoList(
  listId: number
): Promise<TodoList | undefined> {
  return (
    (await db.select().from(todolists).where(eq(todolists.id, listId)))[0] ??
    undefined
  );
}
export async function findOneTodoList(
  listId: number
): Promise<TodoList | undefined> {
  return (await db.select().from(todolists).where(eq(todolists.id, listId)))[0];
}

export async function findAllTodoLists(userId: number): Promise<TodoList[]> {
  return await db
    .select()
    .from(todolists)
    .where(eq(todolists.authorId, userId));
}
export async function updateTodoList(
  listId: number,
  data: Record<string, string>
) {
  return db.update(todolists).set(data).where(eq(todolists.id, listId));
}

export async function deleteTodoList(listId: number) {
  return await db.delete(todolists).where(eq(todolists.id, listId));
}
