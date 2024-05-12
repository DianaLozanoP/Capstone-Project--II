"use strict";

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Sample {
    //Enter a new sample 
    //Returns {work_order, client_id, description_, storage, method_id, chapter_id}

    static async create({ clientId, description, storage, methodId, chapterId }) {
        //send query to enter sample

        const result = await db.query(
            `INSERT INTO samples
                (client_id,
                description_,
                storage, 
                method_id, 
                chapter_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING 
                work_order AS "workOrder",
                client_id AS "clientId",
                description_ AS "description",
                storage, 
                method_id AS "methodId",
                chapter_id AS "chapterId"`,
            [clientId, description, storage, methodId, chapterId],
        );

        const sample = result.rows[0];

        return sample;
    }

    //Get sample based on its work order number

    static async get(workOrder) {
        //find sample by work_order 
        const result = await db.query(`
            SELECT 
            work_order AS "workOrder",
            client_id AS "clientId",
            description_ AS "description",
            storage, 
            method_id AS "methodId",
            chapter_id AS "chapterId"
            FROM samples
            WHERE work_order=$1`, [workOrder]);

        const sample = result.rows[0]

        if (!sample) throw new NotFoundError(`Sample with work order number ${workOrder} was not found.`)

        return sample;
    }

    //Find a sample/samples based on some criteria
    //Possible filters include: description, clientId
    static async getBy(searchFilters = {}) {
        //create initial query
        let query = `SELECT 
                    client_id AS "clientId",
                    work_order AS "workOrder",
                    description_ AS "description",
                    method_id AS "methodId",
                    chapter_id AS "chapterId", 
                    storage
                    FROM samples`;
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
            queryValues.push(`%${description}%`);
            whereExpressions.push(`description_ ILIKE $${queryValues.length}`);
        }
        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }
        //Finalize query and return results 
        query += " ORDER BY description_"

        const samplesRes = await db.query(query, queryValues);
        if (samplesRes.length === 0) throw new NotFoundError(`Sample was not found.`)

        return samplesRes.rows;

    }

    //UPDATE a sample

    static async update(workOrder, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                procedure: "procedure_",
                description: "description_",
                releaseDate: "release_date"
            });

        const workOrderVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE samples
                          SET ${setCols}
                          WHERE work_order =${workOrderVarIdx}
                          RETURNING work_order AS "workOrder",
                                    client_id AS "clientId",
                                    description_ AS "description", 
                                    storage, 
                                    method_id AS "methodId",
                                    chapter_id AS "chapterId"`;
        const result = await db.query(querySql, [...values, workOrder]);
        const sample = result.rows[0];

        if (!sample) throw new NotFoundError(`No samples with ${workOrder} have been found.`);

        return sample;
    }

    //DELETE a sample 
    //Provide work_order
    static async remove(workOrder) {
        const result = await db.query(
            `DELETE
               FROM samples
               WHERE work_order = $1
               RETURNING id`, [workOrder]);
        const sample = result.rows[0];

        if (!sample) throw new NotFoundError(`No job: ${id}`);
    }


};

module.exports = Sample;