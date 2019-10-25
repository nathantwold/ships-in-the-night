CREATE TABLE "users"(
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (25) unique not null,
	"firstname" VARCHAR (25),
	"groupname" VARCHAR not null default 0,
	"email" VARCHAR (50),
	"avatar" bytea,
	"password" VARCHAR (250) not null,
	"admin_level" INT not null default 0
);
CREATE TABLE "groups"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50) unique not null,
	"password" VARCHAR (250) not null
);
CREATE TABLE "tasks"(
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR default 'none',
	"groupname" VARCHAR,
	"created" date not null default CURRENT_DATE,
	"title" VARCHAR(50) not null,
	"detail" VARCHAR(250),
	"due" date,
	"complete" boolean default false
);