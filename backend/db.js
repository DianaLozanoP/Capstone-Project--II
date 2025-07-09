"use strict";

const { Client } = require("pg");

let db;

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    // Only required in dev
    const password = require("./password");

    db = new Client({
        user: "dianaloz",
        host: "/var/run/postgresql",
        database: process.env.NODE_ENV === "test" ? "doculab_test" : "doculab",
        password: password,
        port: 5432,
    });
}

db.connect();

module.exports = db;

// const { Client } = require("pg");
// const connectionString = "postgres://yjphmgsv:Tap5iSfhwSFb5_qMb0GmJAMq5X7H90LN@bubble.db.elephantsql.com/yjphmgsv";

// const db = new Client({
//     connectionString: connectionString
// });

// db.connect()
//     .then(() => {
//         console.log('Connected to the database');
//         // Perform database operations here
//     })
//     .catch(err => {
//         console.error('Error connecting to the database:', err);
//         // Additional error details for debugging
//         console.error('Error code:', err.code); // PostgreSQL error code
//         console.error('Error message:', err.message); // Description of the error
//         console.error('Error stack:', err.stack); // Stack trace
//     });

// module.exports = db;