import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "./schema/schema";

const queryClient = postgres(
  "postgres://user:password@0.0.0.0:54322/tododatabase"
);
const db: PostgresJsDatabase = drizzle(queryClient);

const getUser = async () => {
  const results = await db.select().from(users);
  console.log({ results });

  return results;
};

getUser().catch((err) => console.log({ err }));
