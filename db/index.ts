import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@0.0.0.0:54322/${process.env.POSTGRES_DB}`
);
export const db: PostgresJsDatabase = drizzle(queryClient);
