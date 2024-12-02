# Bowsérmon

A turn-based game, that is mixed between Mario and Pokemon. That has battles like Pokemon and has the characters of Mario. But the story isn't like the normal Mario games. Instead of playing as Mario while he saves the Princess. You will be playing as Bowser while he steals back the Princess. You will have to buy characters and go level by level until you beat Mario at the end. 

## Demo

Once the user is logged in, they will see this screen.
The settings button in the top left, will open and show you everything you need.
The users coins will be displayed next to it.
The right shows the starters you currently have in your party.
The buttons on the screen will bring you to the corisponding page.

![2024-01-26 11 22 05](https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/378abc8c-d1ad-40d2-9840-39fc67979e62)

This is the shop screen, a user can buy any of the 3 potions and once bought, it will be sent to the inventory page.
A user can also buy a random character box and once bought, it will be sent to the character page.

<img width="1440" alt="Screenshot 2024-01-26 at 11 23 43 AM" src="https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/8464d584-64cc-45be-9870-77bde6ce6644">

This is the characters page, the blinking characters are the new characters you just bought.
If you click on a character, it will show the stats of that character.
The right shows the starters you currently have in your party.
You can set starters and also sell characters.

![2024-01-26 11 32 27](https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/bd3ad87c-5514-4ce4-8a68-7b69419cff4e)

This is the inventory page, this shows all potions you have bought.
You can sell any amount of potions by using the slider.

<img width="1438" alt="Screenshot 2024-01-26 at 11 36 51 AM" src="https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/80e1fafd-b950-4909-a3f7-9d6f9fea0442">

This is the campaign page, it has 10 levels you must play and you must start with level 1.
Once you have beaten the level before, the next level will open up.

<img width="1440" alt="Screenshot 2024-01-26 at 11 37 22 AM" src="https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/e18bb917-0c73-46d4-9f28-605abbe93271">

This is the battle page, the closer character is your starter and the farther is the level enemy.
In the bottom right, is the attacks/actions you can use.
Next to that is the text box, text will show in there when the user does an action.

![2024-01-26 14 45 20](https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/27c03978-fa1f-49df-a24f-837dfd5a6763)

This is what different items you have in your inventory.
When used it will increase stats depending on the potion clicked and it will use it on the current charcter.

<img width="1440" alt="Screenshot 2024-01-26 at 2 43 51 PM" src="https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/0a9ce35a-1c8c-4176-901f-52440f0fd5ee">


This is where you can switch your character but it will use a turn.

<img width="1440" alt="Screenshot 2024-01-26 at 2 44 03 PM" src="https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/09c10ea2-ec5c-493c-bc1d-e92f0032f600">


When clicked on an attack, it will do the corrisponding damage and stamina.
Below will show what it looks like.

![2024-01-26 14 52 52](https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/d206341e-a0ff-490e-96bf-2672f46f7def)

Once user has gotten enemy hp bellow 0, this dialog will pop up.

<img width="1440" alt="Screenshot 2024-01-26 at 2 54 44 PM" src="https://github.com/Jacoblars85/prime-solo-project-kingdom-clash/assets/140549863/655db191-9f02-4bed-81dd-b86242a6d5e8">




## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

## Create Database and Table

Create a new database called `bowsermon` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

Go to the `database.sql` file and copy and paste everything into SQL

If you would like to name your database something else, you will need to change `bowsermon` to the name of your new database name in `server/modules/pool.js`.

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.


## Acknowledgments

* Prime Digital Academy
