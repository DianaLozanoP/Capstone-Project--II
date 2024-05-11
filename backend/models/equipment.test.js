"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Equipment = require("../models/equipment.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testClientIds,
    testWorkOrders,
    testEquip
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const equipData = {
    equipName: "Shaker",
    calDue: "2025-01-31"
}

describe("Equipment model", () => {

    test("add()", async () => {

        const equipment = await Equipment.add(equipData);
        // Convert calDue to a Date object
        const expectedCalDue = new Date("2025-01-31T05:00:00.000Z");

        expect(equipment).toEqual({
            "equipId": equipment.equipId,
            "equipName": "Shaker",
            "calDue": expectedCalDue,
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT equip_name
            FROM equipment
            WHERE equip_id= $1`, [equipment.equipId]);

        expect(result.rows[0]).toEqual({ "equip_name": "Shaker" })

    });


});

describe("Equipment model-using equip_used TABLE AS WELL", () => {

    test("used()", async () => {
        //Check that entering into database gives me back what I'm expecting
        const equipment = await Equipment.used(testEquip[0], testWorkOrders[0]);

        expect(equipment).toEqual(
            {
                equipId: testEquip[0],
                workOrder: testWorkOrders[0]
            }
        );

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT equip_id, work_order
            FROM equipment_used
            WHERE equip_id= $1`, [testEquip[0]]);

        expect(result.rows[0].work_order).toEqual(testWorkOrders[0])

    });
});


describe("Equipment model", () => {

    test("update()", async () => {
        //Check that entering into database gives me back what I'm expecting
        const expectedCalDue = new Date("2025-01-30T05:00:00.000Z");
        const equipment = await Equipment.update(testEquip[0],
            {
                "equipName": "ShakerUPDATE"
            }
        );

        expect(equipment).toEqual({
            "equipId": testEquip[0],
            "equipName": "ShakerUPDATE",
            "calDue": expectedCalDue,
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT equip_name
            FROM equipment
            WHERE equip_id= $1`, [testEquip[0]]);

        expect(result.rows[0]).toEqual({ "equip_name": "ShakerUPDATE" })
    });
});
