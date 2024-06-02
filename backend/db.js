"use strict";
/** Database setup for jobly. */
// const { Client } = require("pg");
// const password = require('./password')
// // const { getDatabaseUri } = require("./config");

// let database;
// if (process.env.NODE_ENV === "test") {
//     database = "doculab_test";
// } else {
//     database = "doculab";
// }

// let db;
// if (process.env.NODE_ENV === "production") {
//     db = new Client({
//         ssl: {
//             rejectUnauthorized: false
//         }, user: 'dianaloz',
//         host: '/var/run/postgresql',
//         database: database,
//         password: password,
//         port: 5432
//     });
// } else {
//     db = new Client({
//         user: 'dianaloz',
//         host: '/var/run/postgresql',
//         database: database,
//         password: password,
//         port: 5432
//     });
// }

// db.connect();

// module.exports = db;

const { Client } = require("pg");
const connectionString = "postgres://yjphmgsv:Tap5iSfhwSFb5_qMb0GmJAMq5X7H90LN@bubble.db.elephantsql.com/yjphmgsv";

const db = new Client({
    connectionString: connectionString
});

db.connect()
    .then(() => {
        console.log('Connected to the database');
        // Perform database operations here
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        // Additional error details for debugging
        console.error('Error code:', err.code); // PostgreSQL error code
        console.error('Error message:', err.message); // Description of the error
        console.error('Error stack:', err.stack); // Stack trace
    });

module.exports = db;