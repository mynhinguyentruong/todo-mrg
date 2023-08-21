"use server";

import { Todo } from "@/app/types/db";
import { db } from "@/db";
import { todos } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function createTodo(
  todo: Omit<Todo, "id" | "completed">
): Promise<Todo> {
  return (await db.insert(todos).values(todo).returning())[0];
}

export async function createTodos(todoArr: Omit<Todo, "id" | "completed">[]): Promise<Todo[]> {
  return await db.insert(todos).values(todoArr).returning()
}

export async function getOneTodo(todoId: number): Promise<Todo | undefined> {
  const dbTodo = await db.select().from(todos).where(eq(todos.id, todoId));

  if (dbTodo == null || !dbTodo.length) {
    return undefined;
  }

  return dbTodo[0];
}

export async function findTodos(todoId: number): Promise<Todo[] | undefined> {
  return db.select().from(todos).where(eq(todos.id, todoId));
}

export async function findAllInList(listId: number): Promise<Todo[]> {
  return db
    .select()
    .from(todos)
    .where(eq(todos.listId, listId))
    .orderBy(todos.id);
}

export async function updateTodo(
  todoId: number,
  data: Record<string, boolean | string>
): Promise<Todo> {
  return (
    await db.update(todos).set(data).where(eq(todos.id, todoId)).returning()
  )[0];
}

export async function deleteTodo(todoId: number) {
  return await db.delete(todos).where(eq(todos.id, todoId));
}
