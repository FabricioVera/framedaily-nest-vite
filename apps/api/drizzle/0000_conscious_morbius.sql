CREATE TABLE "warframes" (
	"id" serial PRIMARY KEY NOT NULL,
	"unique_name" varchar(255),
	"name" varchar(150) NOT NULL,
	"type" varchar(100),
	"is_prime" boolean DEFAULT false,
	"aura" varchar(100),
	"passive" text,
	"release_year" integer,
	"release_date" varchar(20),
	"description" text,
	"health" integer,
	"armor" integer,
	"shield" integer,
	"sprint_speed" numeric(4, 2),
	"polarities" varchar(100)[],
	"sex" varchar(10),
	"image_name" varchar(500),
	"thumbnail_url" varchar(500),
	"wiki_url" varchar(500),
	"exalted" text[],
	"has_exalted" boolean DEFAULT false,
	"themes" varchar(255)[],
	"progenitor" varchar(255),
	"playstyle" text[],
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "abilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"warframe_id" integer NOT NULL,
	"unique_name" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"image_name" varchar(255),
	"thumbnail_url" varchar(255),
	"card_thumbnail_url" varchar(255),
	"augments" varchar(255)[]
);
--> statement-breakpoint
ALTER TABLE "abilities" ADD CONSTRAINT "abilities_warframe_id_warframes_id_fk" FOREIGN KEY ("warframe_id") REFERENCES "public"."warframes"("id") ON DELETE cascade ON UPDATE no action;