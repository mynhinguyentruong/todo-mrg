// Connect to Docker Postgres instance
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
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
import "dotenv/config";

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:54322/tododatabase`;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  console.log("Initializing migration...");

  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migration completed");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});