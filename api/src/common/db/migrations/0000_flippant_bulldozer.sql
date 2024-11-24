CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(255) NOT NULL,
	"categoryId" integer NOT NULL,
	"en" varchar(255) NOT NULL,
	"pl" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryName" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "words" ADD CONSTRAINT "words_categoryId_words_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."words_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
