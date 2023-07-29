import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users } from "./schema/schema";
import * as schema from "./schema/schema";
import { InferModel, eq } from "drizzle-orm";

const queryClient = postgres(
  "postgres://user:password@0.0.0.0:54322/tododatabase"
);
const db: PostgresJsDatabase = drizzle(queryClient);

const getUser = async () => {
  const results = await db.select().from(users);
  console.log({ results });

  return results;
};

type NewTodo = InferModel<typeof todos, "insert">;

const todo = {
  authorId: 1,
  title: "Todo 1",
  content: "This is my first todo",
};

const addTodo = async (todo: NewTodo) => {
  await db.insert(todos).values(todo);
};

const getAllTodos = async (userId: number) => {
  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.authorId, userId));
  console.log({ result });

  return;
};

// getUser().catch((err) => console.log({ err }));
// addTodo(todo).catch((err) => console.log("add todo error: ", err));
getAllTodos(1).catch((err) => console.log("get all todo error: ", err));
