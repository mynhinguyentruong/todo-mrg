CREATE TABLE IF NOT EXISTS "todolists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(64),
	"author_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "list_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(64);