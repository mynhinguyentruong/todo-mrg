"use server";

import { User } from "@/app/types/db";
import { db } from "@/db";
import { todos, users } from "@/db/schema/schema";
import { eq, sql } from "drizzle-orm";

export async function createUser(user: Omit<User, "id">): Promise<User> {
  return (await db.insert(users).values(user).returning())[0];
}

export async function getOneUser(
  user: Omit<User, "id">
): Promise<User | undefined> {
  const dbUser = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = ${user.email}`);

  if (dbUser == null || !dbUser.length) {
    return undefined;
  }

  return dbUser[0];
}

export async function getOrCreateUser(user: Omit<User, "id">): Promise<User> {
  const dbUser = await getOneUser(user);
  return dbUser ?? createUser(user);
}

export async function findUserWithID(
  userId: number
): Promise<User | undefined> {
  return (
    (await db.select().from(users).where(eq(users.id, userId)))[0] ?? undefined
  );
}

export async function updateUser() {}
