const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Methods {
    //GET ALL METHODS
    static async getAll() {
        //find sample by work_order 
        const result = await db.query(`
            SELECT 
            method_id AS "methodId",
            m_name AS "methodName"
            FROM genmethods`);

        const methods = result.rows;

        return methods;
    }

};

module.exports = Methods;