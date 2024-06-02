const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Chapters {
    //GET ALL METHODS
    static async getAll() {
        //find sample by work_order 
        const result = await db.query(`
            SELECT 
            chapter_id AS "chapterId",
            chapter AS "chapter"
            FROM chapters`);

        const chapters = result.rows;

        return chapters;
    }

};

module.exports = Chapters;