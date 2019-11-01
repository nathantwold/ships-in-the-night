# Ships in the Night
A household chore management and delegation app.

# Base Functionality

This app will allow users to create private groups and invite members to share in household chores and task management.
Tasks may have due dates, comments or details, and the ability to be grabbed by a user and marked 'claimed' or 'complete'.
Users may randomly assign an owner on task creation for those tasks that no-one likes to tackle.
The group owner or "fleet commander" (the user that created the group) has the ability to remove users from the group.

# Future Functionality

The ability to send a task as a request to another user in the group.
A point system for completing tasks to keep things fair.
The ability to upload a photo avatar to more easily see who task owners are.

# Spin up

- clone or download a the project into a folder.
- run npm install
- in one tab run npm run server
- in another run npm run client

the project will open in a new tab running on localhost:3000

Additional README details can be found [here](https://github.com/nathantwold/ships-in-the-night).

# Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

# Create database and table

Create a new database called `ships-in-the-night` and create the following tables:

```SQL
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
```

If you would like to name your database something else, you will need to change `ships-in-the-night` to the name of your new database name in `server/modules/pool.js`

# Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    REACT_APP_EMAIL_USER ='your email address'
    REACT_APP_EMAIL_PASS ='your email password'
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
    You will need to enter a working email address and password if you plan to use the invite function.  You may have to adjust the security settings of your email account to allow less secure apps for this to work.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

