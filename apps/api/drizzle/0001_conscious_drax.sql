ALTER TABLE "warframes" ALTER COLUMN "name" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "warframes" ALTER COLUMN "type" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "warframes" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "warframes" ALTER COLUMN "image_name" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "warframes" ALTER COLUMN "wiki_url" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "warframes" ADD COLUMN "unique_name" varchar(255);--> statement-breakpoint
ALTER TABLE "warframes" ADD COLUMN "aura" varchar(100);--> statement-breakpoint
ALTER TABLE "warframes" ADD COLUMN "release_year" integer;--> statement-breakpoint
ALTER TABLE "warframes" ADD COLUMN "sex" varchar(10);--> statement-breakpoint
ALTER TABLE "warframes" ADD COLUMN "wikia_thumbnail" varchar(500);