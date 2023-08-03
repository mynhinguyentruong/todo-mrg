import { todolists, todos, users } from "@/db/schema/schema";
import { InferModel } from "drizzle-orm";

export type Todo = InferModel<typeof todos>;
export type TodoList = InferModel<typeof todolists>;
export type User = InferModel<typeof users>;
