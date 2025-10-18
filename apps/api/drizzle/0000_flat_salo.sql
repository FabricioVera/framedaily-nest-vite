CREATE TABLE "warframes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(50),
	"description" varchar(255),
	"health" integer,
	"armor" integer,
	"shield" integer,
	"sprint_speed" numeric(4, 2),
	"is_prime" boolean DEFAULT false,
	"release_date" varchar(20),
	"image_name" varchar(255),
	"wiki_url" varchar(255),
	"created_at" timestamp DEFAULT now()
);
