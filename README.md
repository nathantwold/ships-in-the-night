# Ships in the Night
A household task managent and sharing app.

# Base Functionality

This app will allow users to create private groups and invite members to share in household chore and task management.
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

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum. 

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
    1. `POST /api/user/register` registers a new user, see body to change username/password
    2. `POST /api/user/login` will login a user, see body to change username/password
    3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
