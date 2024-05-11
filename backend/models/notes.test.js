"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Notes = require("../models/notes.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testClientIds,
    testWorkOrders,
    testGenMethods,
    testChapters,
    testEquip,
    testMedia,
    testUsers
} = require("./_testCommon");
const { update } = require("./equipment.js");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const testNotes = {
    "workOrder": testWorkOrders[0],
    "testDate": "2024-05-30",
    "analyst": testUsers[0],
    "procedure": "THIS IS A TESTING PROCEDUREE",
    "releaseDate": "2024-06-13",
    "results": "No growth",
    "reviewed": null
};

describe("Notes model", () => {

    test("create()", async () => {

        const notes = await Notes.create({
            "workOrder": testWorkOrders[0],
            "testDate": "2024-05-30",
            "analyst": testUsers[0],
            "procedure": "THIS IS A TESTING PROCEDUREE",
            "releaseDate": "2024-06-13",
            "results": "No growth",
            "reviewed": null
        });

        expect(notes).toEqual({
            "workOrder": testWorkOrders[0],
            "testDate": new Date("2024-05-30T04:00:00.000Z"),
            "analyst": testUsers[0],
            "procedure": "THIS IS A TESTING PROCEDUREE",
            "releaseDate": new Date("2024-06-13T04:00:00.000Z"),
            "results": "No growth",
            "reviewed": null
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT 
            *
            FROM notes
            WHERE work_order= $1`, [notes.workOrder]);

        expect(result.rows[0].procedure_).toEqual("THIS IS A TESTING PROCEDUREE")

    });

    test("bad request with dupe", async function () {
        try {
            await Notes.create({
                "workOrder": testWorkOrders[0],
                "testDate": "2024-05-30",
                "analyst": testUsers[0],
                "procedure": "THIS IS A TESTING PROCEDUREE",
                "releaseDate": "2024-06-13",
                "results": "No growth",
                "reviewed": null
            });
            await Notes.create({
                "workOrder": testWorkOrders[0],
                "testDate": "2024-05-30",
                "analyst": testUsers[0],
                "procedure": "THIS IS A TESTING PROCEDUREE",
                "releaseDate": "2024-06-13",
                "results": "No growth",
                "reviewed": null
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

describe("Notes model", () => {
    test("findAll()", async () => {
        const notes = await Notes.create({
            "workOrder": testWorkOrders[0],
            "testDate": "2024-05-30",
            "analyst": testUsers[0],
            "procedure": "THIS IS A TESTING PROCEDUREE",
            "releaseDate": "2024-06-13",
            "results": "No growth",
            "reviewed": null
        });
        const allNotes = await Notes.findAll({ "workOrder": testWorkOrders[0] });

        expect(allNotes).toEqual([
            {
                "workOrder": testWorkOrders[0],
                "testDate": new Date("2024-05-30T04:00:00.000Z"),
                "analyst": testUsers[0],
                "procedure": "THIS IS A TESTING PROCEDUREE",
                "releaseDate": new Date("2024-06-13T04:00:00.000Z"),
                "results": "No growth",
                "reviewed": null
            }
        ])
    });
})


describe("Notes model", () => {
    test("update()", async () => {

        const notes = await Notes.create({
            "workOrder": testWorkOrders[0],
            "testDate": "2024-05-30",
            "analyst": testUsers[0],
            "procedure": "THIS IS A TESTING PROCEDUREE",
            "releaseDate": "2024-06-13",
            "results": "No growth",
            "reviewed": null
        });
        const updatedNotes = await Notes.update(notes.workOrder, {
            "procedure": "UPDATING THIS PROCEDURE"
        });

        const notes1 = await Notes.findAll(notes.workOrder)

        expect(notes1).toEqual([{
            "workOrder": notes.workOrder,
            "testDate": new Date("2024-05-30T04:00:00.000Z"),
            "analyst": testUsers[0],
            "procedure": "UPDATING THIS PROCEDURE",
            "releaseDate": new Date("2024-06-13T04:00:00.000Z"),
            "results": "No growth",
            "reviewed": null
        }]);
    });

});
