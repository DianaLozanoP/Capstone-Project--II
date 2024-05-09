"use strict";

const db = require("../db.js");

const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Media {
    static async add(data) {
        const result = await db.query(`INSERT INTO media
                                      (daycode, 
                                        media_name, 
                                        exp,
                                        reviewed)
                                        VALUES ($1, $2, $3, $4)
                                        RETURNING
                                        media_id,
                                        daycode, 
                                        media_name AS "mediaName",
                                        exp, 
                                        reviewed`,
            [data.daycode,
            data.mediaName,
            data.exp,
            data.reviewed
            ]);

        const media = result.rows[0];
        return media;
    }

    static async used(mediaId, workOrder) {
        const result = await db.query(`INSERT INTO media_used
                                    (media_id,
                                    work_order)
                                    VALUES ($1, $2)
                                    RETURNING
                                    media_id AS "equipId",
                                    work_order AS "workOrder"`,
            [mediaId, workOrder]);

        const media = result.rows[0];
        return media;
    }

    static async update(mediaId, data) {
        //PREPARE FOR QUERY
        //COLUMNS TO BE UPDATED (changed as needed)
        //VALUES TO BE ENTERED
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                mediaName: "media_name"
            });

        const mediaIdVarIdx = "$" + (values.length + 1);

        //START QUERY
        const querySql = `UPDATE media
                          SET ${setCols}
                          WHERE val_id =${mediaIdVarIdx}
                          RETURNING
                          daycode, 
                          media_name AS "mediaName",
                          exp, 
                          reviewed"`;

        const result = await db.query(querySql, [...values, mediaId]);
        const media = result.rows[0];

        if (!media) throw new NotFoundError(`No media matches the id entered.`);

        return media;
    }

    static async delete(mediaId) {
        const result = await db.query(
            `DELETE
             FROM media
             WHERE media_id = $1
             RETURNING media_id`,
            [mediaId]);
        const media = result.rows[0];

        if (!media) throw new NotFoundError(`No media matches the id entered.`);

    }
}

module.exports = Media;