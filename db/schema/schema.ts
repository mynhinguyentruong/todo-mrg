import {
  integer,
  pgTable,
  serial,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }),
  email: varchar("email", { length: 64 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
  todolists: many(todolists),
}));

export const todolists = pgTable("todolists", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 64 }),
  authorId: integer("author_id").notNull(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  content: varchar("content", { length: 256 }),
  authorId: integer("author_id").notNull(),
  completed: boolean("completed").default(false),
  listId: integer("list_id").notNull(),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, { fields: [todos.authorId], references: [users.id] }),
}));
