import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  content: varchar("content", { length: 256 }),
  authorId: integer("author_id").notNull(),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, { fields: [todos.authorId], references: [users.id] }),
}));
