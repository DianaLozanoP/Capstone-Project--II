"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const password = require('./password')
// const { getDatabaseUri } = require("./config");

let database;
if (process.env.NODE_ENV === "test") {
    database = "doculab_test";
} else {
    database = "doculab";
}

let db;
if (process.env.NODE_ENV === "production") {
    db = new Client({
        ssl: {
            rejectUnauthorized: false
        }, user: 'dianaloz',
        host: '/var/run/postgresql',
        database: database,
        password: password,
        port: 5432
    });
} else {
    db = new Client({
        user: 'dianaloz',
        host: '/var/run/postgresql',
        database: database,
        password: password,
        port: 5432
    });
}

db.connect();

module.exports = db;