import { todolists, todos, users } from "@/db/schema/schema";
import { InferModel } from "drizzle-orm";

export type NewTodo = InferModel<typeof todos, "insert">;
export type Todo = InferModel<typeof todos>;

export type TodoList = InferModel<typeof todolists>;
export type NewTodoList = InferModel<typeof todolists, "insert">;

export type Users = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
