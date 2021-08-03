# Plantify
## Plant's store

Demo app: https://170wt.csb.app/

## Description

**Plantify** is a browser plant's store, with globally managed state using React Context and neat styling.

### Features

- You can add plants to your cart and remove them. Plants are grouped if you add more than 1 of the particular type.
- You can filter the plants to easily find the one you're looking for

## About the project

The project was developed as training of fetching and rendering third-party data in React (REST API created with Firebase). The state is globally managed with React Context and useReducer hook, instead of useState, as the state is can be too complicated for useState hook.
Modals are being displayed using portals.


### Styling

The styling approach that I chose for this project is **CSS modules** in React. It helps to encapsulate styling for a particular component while having your styling in separated file, not withing .js file.

### Future scope

- Real database
- Login and authentication
- Routing
- Payments with Stripe


## Project setup

### Requirements

You’ll need to have **Node >= 10** on your local development machine.

### How to run the project in development mode

First, you have to install the dependencies. You can do that by going to the root folder of the project and typing:

    npm install

in the terminal.

To run the project in development mode, type:

    npm start

in the project directory.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You can see the Redux store and actions dispatched in the console of Developer tools of your browser.