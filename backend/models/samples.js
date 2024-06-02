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
    //GET ALL SAMPLES
    static async findAll() {
        const samplesRes = await db.query(
            `SELECT  
            s.client_id AS "clientId",
            s.work_order AS "workOrder",
            s.description_ AS "description",
            s.method_id AS "methodId",
            s.storage,
            m.m_name AS "methodName",
            s.chapter_id AS "chapterId",
            c.client_name AS "clientName",
            ch.chapter,
            n.test_date AS "testDate",
            n.release_date AS "releaseDate"
            FROM 
                samples s
            LEFT JOIN 
                clients c ON s.client_id = c.client_id
            LEFT JOIN 
                genmethods m ON s.method_id = m.method_id
            LEFT JOIN 
                chapters ch ON s.chapter_id = ch.chapter_id
            LEFT JOIN 
                notes n ON s.work_order = n.work_order;`);

        return samplesRes.rows;
    }

    //Get sample based on its work order number

    static async get(workOrder) {
        //find sample by work_order 
        const result = await db.query(`
        SELECT 
            s.client_id AS "clientId",
            s.work_order AS "workOrder",
            s.description_ AS "description",
            s.method_id AS "methodId",
            s.storage,
            m.m_name AS "methodName",
            s.chapter_id AS "chapterId",
            c.client_name AS "clientName",
            ch.chapter,
            n.test_date AS "testDate",
            n.release_date AS "releaseDate"
            FROM 
                samples s
            LEFT JOIN 
                clients c ON s.client_id = c.client_id
            LEFT JOIN 
                genmethods m ON s.method_id = m.method_id
            LEFT JOIN 
                chapters ch ON s.chapter_id = ch.chapter_id
            LEFT JOIN 
                notes n ON s.work_order = n.work_order
        WHERE s.work_order=$1`, [workOrder]);

        const sample = result.rows[0]

        if (!sample) throw new NotFoundError(`Sample with work order number ${workOrder} was not found.`)

        return sample;
    }

    //Find a sample/samples based on some criteria
    //Possible filters include: description, clientId
    static async getBy(searchFilters = {}) {
        //create initial query
        let query = `SELECT 
        s.client_id AS "clientId",
        s.work_order AS "workOrder",
        s.description_ AS "description",
        s.method_id AS "methodId",
        s.storage,
        m.m_name AS "methodName",
        s.chapter_id AS "chapterId",
        c.client_name AS "clientName",
        ch.chapter,
        n.test_date AS "testDate",
        n.release_date AS "releaseDate"
        FROM 
            samples s
        LEFT JOIN 
            clients c ON s.client_id = c.client_id
        LEFT JOIN 
            genmethods m ON s.method_id = m.method_id
        LEFT JOIN 
            chapters ch ON s.chapter_id = ch.chapter_id
        LEFT JOIN 
            notes n ON s.work_order = n.work_order`;
        //create an array for the WHERE conditions to include in query
        let whereExpressions = [];
        //create an array for the values that will be used to filter
        let queryValues = [];

        const { clientId, description } = searchFilters;
        // For each possible search term, add to whereExpressions and queryValues so
        // we can generate the right SQL
        if (clientId !== undefined) {
            queryValues.push(clientId);
            whereExpressions.push(`s.client_id =$${queryValues.length}`);
        }
        if (description !== undefined) {
            queryValues.push(`%${description}%`);
            whereExpressions.push(`s.description_ ILIKE $${queryValues.length}`);
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