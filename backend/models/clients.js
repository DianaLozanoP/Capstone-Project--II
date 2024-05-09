"use strict"

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Client {
    // Register client with data
    //Returns {client_id,client_name, email, contact_info}
    static async register({ clientName, email, contactInfo }) {
        //query the database to check for duplicates
        const dupCheck = await db.query(`
         SELECT client_id 
         FROM clients
         WHERE clientName =$1`,
            [clientName],
        );
        if (dupCheck.rows[0]) {
            throw new BadRequestError(`Duplicate client: ${clientName}`);
        }

        const result = await db.query(
            `INSERT INTO clients
                (client_name, 
                email, 
                contact_info)
                VALUES ($1, $2, $3)
                RETURNING client_id,
                 client_name AS "clientName", 
                 email, 
                 contact_info AS "contactInfo"`,
            [
                clientName,
                email,
                contactInfo
            ],
        );

        const client = result.rows[0];

        return client;
    }

    //Returns all clients
    static async findAll() {
        const result = await db.query(
            `SELECT 
                client_name AS "clientName", 
                email, 
                contact_info AS "contactInfo"
            FROM clients`,
        );

        const clients = result.rows
        return clients;
    }

    //Find all clients with searchFilter(name).
    //Returns [{clientName, email, contactInfo}]

    static async findBy(clientName) {
        const result = await db.query(
            `SELECT 
                client_name AS "clientName", 
                email, 
                contact_info AS "contactInfo"
            FROM clients
            WHERE client_name ILIKE $1`,
            [`%${clientName}%`],
        );

        const clients = result.rows
        return clients;
    }

    static async update(client_id, data) {
        //create the query to update values
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                email: "email",
                contactInfo: "contact_info",
            });

        const clientVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE clients
                        SET ${setCols}
                        WHERE client_id = ${clientVarIdx}
                        RETURNING client_id,
                                client_name AS "clientName", 
                                email, 
                                contact_info AS "contactInfo"`;

        const result = await db.query(querySql, [...values, client_id]);
        const client = client.rows[0]

        if (!client) throw new NotFoundError(`Client not found.`)

        return client;
    }
};

module.exports = Client;