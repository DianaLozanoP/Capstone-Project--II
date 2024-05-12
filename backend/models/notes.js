"use strict";

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Notes {
    static async create(data) {
        const dupCheck = await db.query(`
            SELECT work_order 
            FROM notes
            WHERE work_order =$1`,
            [data.workOrder]);

        if (dupCheck.rows[0]) {
            throw new BadRequestError(`Duplicate notes: ${data.workOrder}`);
        }
        const result = await db.query(
            `INSERT INTO notes (work_order,
                                test_date,
                                analyst, 
                                procedure_, 
                                release_date,
                                results, 
                                reviewed)
            VALUES ($1,$2,$3,$4, $5, $6, $7)
            RETURNING
            work_order  AS "workOrder", 
            test_date AS "testDate", 
            analyst AS "analyst", 
            procedure_ AS "procedure", 
            release_date AS "releaseDate",
            results, 
            reviewed`,
            [data.workOrder,
            data.testDate,
            data.analyst,
            data.procedure,
            data.releaseDate,
            data.results,
            data.reviewed]);
        let labnotes = result.rows[0]
        return labnotes;
    }

    //Filter notes (optional filter on searchFilters)
    static async findAll(searchFilters = {}) {
        //create initial query
        let query = `SELECT work_order AS "workOrder",
                            test_date AS "testDate",
                            analyst, 
                            procedure_ AS "procedure", 
                            release_date AS "releaseDate",
                            results, 
                            reviewed
                    FROM notes`;
        //create an array for the WHERE conditions to include in query
        let whereExpressions = [];
        //create an array for the values that will be used to filter
        let queryValues = [];

        const { workOrder, testDate, analyst, releaseDate } = searchFilters;
        // For each possible search term, add to whereExpressions and queryValues so
        // we can generate the right SQL
        if (workOrder !== undefined) {
            queryValues.push(workOrder);
            whereExpressions.push(`work_order =$${queryValues.length}`);
        }
        if (testDate !== undefined) {
            queryValues.push(testDate);
            whereExpressions.push(`test_date =$${queryValues.length}`);
        }
        if (analyst !== undefined) {
            queryValues.push(analyst);
            whereExpressions.push(`analyst =$${queryValues.length}`);
        }
        if (releaseDate !== undefined) {
            queryValues.push(releaseDate);
            whereExpressions.push(`release_date =$${queryValues.length}`);
        }
        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }
        //Finalize query and return results 

        const notes = await db.query(query, queryValues);
        return notes.rows;
    }

    static async update(workOrder, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                procedure: "procedure_",
                releaseDate: "release_date"
            });

        const workOrderVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE notes
                          SET ${setCols}
                          WHERE work_order =${workOrderVarIdx}
                          RETURNING work_order AS "workOrder",
                                    test_date AS "testDate",
                                    analyst, 
                                    procedure_ AS "procedure", 
                                    release_date AS "releaseDate",
                                    results, 
                                    reviewed`;
        const result = await db.query(querySql, [...values, workOrder]);
        const labnotes = result.rows[0];

        if (!labnotes) throw new NotFoundError(`No lab notes with ${workOrder} have been found.`);

        return labnotes;
    }
}

module.exports = Notes;
