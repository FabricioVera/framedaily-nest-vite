CREATE TABLE "abilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"warframe_id" integer NOT NULL,
	"unique_name" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"image_name" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "abilities" ADD CONSTRAINT "abilities_warframe_id_warframes_id_fk" FOREIGN KEY ("warframe_id") REFERENCES "public"."warframes"("id") ON DELETE cascade ON UPDATE no action;