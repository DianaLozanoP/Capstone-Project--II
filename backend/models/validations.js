"use strict";

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Validation {
    //Enter a validation
    //Returns {val_id, client_id, work_order, method_id, chapter_id, val_date, val_method}

    static async create({ clientId, workOrder, description, methodId, chapterId, valDate, valMethod }) {
        const result = await db.query(
            `INSERT INTO validations
                (client_id, 
                work_order, 
                description_,
                method_id, 
                chapter_id, 
                val_date, 
                val_method)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING 
                client_id AS "clientId", 
                work_order AS "workOrder", 
                method_id  AS "methodId", 
                chapter_id AS "chapterId", 
                val_date AS "valDate", 
                val_method AS "valMethod"`,
            [clientId, workOrder, description, methodId, chapterId, valDate, valMethod],
        );

        const validation = result.rows[0];

        return validation;
    }

    //find a validation
    // Returns {val_id, client_id, work_order, method_id, chapter_id, val_date, val_method}
    static async get(val_id) {
        //find sample by work_order 
        const result = await db.query(`
            SELECT * FROM samples
            WHERE work_order=$1`, [val_id]);

        const sample = result.rows[0]

        if (!sample) throw new NotFoundError(`Sample with work order number ${work_order} was not found.`)

        return sample;
    }
    //find a validation based on multiple optional filters such client name, product description
    //Returns {val_id, client_id, work_order,description_, method_id, chapter_id, val_date, val_method}

    static async getBy(searchFilters = {}) {
        //create initial query
        let query = `SELECT val_id,
                            client_id AS "clientId",
                            work_order AS "workOrder",
                            description_ AS "description",
                            method_id AS "methodId",
                            chapter_id AS "chapterId",
                            val_date AS "valDate", 
                            val_method AS "valMethod"
                    FROM validations`;
        //create an array for the WHERE conditions to include in query
        let whereExpressions = [];
        //create an array for the values that will be used to filter
        let queryValues = [];

        const { clientId, description } = searchFilters;
        // For each possible search term, add to whereExpressions and queryValues so
        // we can generate the right SQL
        if (clientId !== undefined) {
            queryValues.push(clientId);
            whereExpressions.push(`client_id =$${queryValues.length}`);
        }
        if (description !== undefined) {
            queryValues.push(description);
            whereExpressions.push(`description_ ILIKE $${queryValues.length}`);
        }
        if (whereExpressions.length > 0) {
            query += "WHERE" + whereExpressions.join(" AND ");
        }
        //Finalize query and return results 
        query += " ORDER BY description_"
        const validationsRes = await db.query(query, queryValues);
        return validationsRes.rows;
    }

    static async update(valId, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                clientId: "client_id",
                workOrder: "work_order",
                description: "description_",
                methodId: "method_id",
                chapterId: "chapter_id",
                valDate: "val_date",
                valMethod: "val_method"
            });

        const valIdVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE validations
                          SET ${setCols}
                          WHERE val_id =${valIdVarIdx}
                          RETURNING val_id AS "valId"
                                    client_id AS "clientId",
                                    work_order AS "workOrder",
                                    description_ AS "description", 
                                    method_id AS "methodId", 
                                    chapter_id AS "chapterId",
                                    val_date AS "valDate", 
                                    val_method AS "valMethod"`;
        const result = await db.query(querySql, [...values, valId]);
        const validation = result.rows[0];

        if (!validation) throw new NotFoundError(`No validations with ${workOrder} have been found.`);

        return validation;
    }
}

module.exports = Validation;