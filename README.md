# auth-system-starter
A simple and secure authentication system for any web app using Node.js, Passport.js, and PostgreSQL.

This is a Node.js application so you will need Node.js to run it: https://nodejs.org/en/download/ 

Once Node is downloaded and configured properly. You have to change directories to the root folder of the app and run "npm install". This will download all the essential packages for the application.

After all the packages are downloaded you have to create an environment variables folder named ".env" and fill out the necessary fields like the port number, postgres password, postgres user, etc. There is an example of what this file should look like in the app called ".env.example". 

Once that is complete, to run the app you simply type "npm run dev". This should spin up a local development server on your machine.

The app should then be available at http://localhost:8000.

All HTML files should go in the "views" folder and end with ".ejs".

Bootstrap is already configured.

Let me know if you have trouble setting up the app.  

Jackson

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Configure app

## Running the project

    $ npm run dev

## Simple build for production

    $ npm run build
