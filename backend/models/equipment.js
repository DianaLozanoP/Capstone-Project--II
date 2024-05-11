"use strict";

const db = require("../db.js");

const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError.js");

class Equipment {
    static async add(data) {
        const result = await db.query(`INSERT INTO equipment
                                      (equip_name,
                                        cal_due
                                      )
                                        VALUES ($1, $2)
                                        RETURNING
                                        equip_id AS "equipId",
                                        equip_name AS "equipName",
                                        cal_due AS "calDue"`,
            [data.equipName,
            data.calDue
            ]);

        const equipment = result.rows[0];
        return equipment;
    }

    static async used(equipId, workOrder) {
        const result = await db.query(`INSERT INTO equipment_used
                                    (equip_id,
                                    work_order)
                                    VALUES ($1, $2)
                                    RETURNING
                                    equip_id AS "equipId",
                                    work_order AS "workOrder"`,
            [equipId, workOrder]);

        const equipment = result.rows[0];
        return equipment;
    }

    static async update(equipId, data) {
        //PREPARE FOR QUERY
        //COLUMNS TO BE UPDATED (changed as needed)
        //VALUES TO BE ENTERED
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                equipName: "equip_name",
                calDue: "cal_due"
            });

        const equipIdVarIdx = "$" + (values.length + 1);

        //START QUERY
        const querySql = `UPDATE equipment
                          SET ${setCols}
                          WHERE equip_id =${equipIdVarIdx}
                          RETURNING
                          equip_id AS "equipId", 
                          equip_name AS "equipName", 
                          cal_due AS "calDue"`;

        const result = await db.query(querySql, [...values, equipId]);
        const equipment = result.rows[0];

        if (!equipment) throw new NotFoundError(`No equipment matches the id entered.`);

        return equipment;
    }

    static async delete(equipId) {
        const result = await db.query(
            `DELETE
             FROM equipment
             WHERE equip_id = $1
             RETURNING equip_id`,
            [equipId]);
        const equipment = result.rows[0];

        if (!equipment) throw new NotFoundError(`No equipment matches the id entered.`);

    }
}

module.exports = Equipment;