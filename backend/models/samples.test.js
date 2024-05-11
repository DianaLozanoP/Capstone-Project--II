"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Samples = require("../models/samples.js");
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

const testSample = {
    "clientId": testClientIds[0],
    "description": "TESTING SAMPLE",
    "storage": "2-8 degrees",
    "methodId": testGenMethods[0],
    "chapterId": testChapters[0]
};

describe("Samples model", () => {

    test("create()", async () => {

        const sample = await Samples.create({
            "clientId": testClientIds[0],
            "description": "TESTING SAMPLE",
            "storage": "2-8 degrees",
            "methodId": testGenMethods[0],
            "chapterId": testChapters[0]
        });

        expect(sample).toEqual({
            "workOrder": sample.workOrder,
            "clientId": testClientIds[0],
            "description": "TESTING SAMPLE",
            "storage": "2-8 degrees",
            "methodId": testGenMethods[0],
            "chapterId": testChapters[0]
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT 
            *
            FROM samples
            WHERE work_order= $1`, [sample.workOrder]);

        expect(result.rows[0].description_).toEqual("TESTING SAMPLE")

    });

});

describe("Samples model", () => {
    test("get()", async () => {
        const sample = await Samples.create({
            "clientId": testClientIds[0],
            "description": "TESTING SAMPLE",
            "storage": "2-8 degrees",
            "methodId": testGenMethods[0],
            "chapterId": testChapters[0]
        });
        const allSamples = await Samples.get(sample.workOrder);

        expect(allSamples).toEqual(
            {
                "workOrder": sample.workOrder,
                "clientId": testClientIds[0],
                "description": "TESTING SAMPLE",
                "storage": "2-8 degrees",
                "methodId": testGenMethods[0],
                "chapterId": testChapters[0]
            }
        )
    });
})


describe("Samples model", () => {
    test("Get by ()", async () => {

        const sample = await Samples.create({
            "clientId": testClientIds[0],
            "description": "TESTING SAMPLE",
            "storage": "2-8 degrees",
            "methodId": testGenMethods[0],
            "chapterId": testChapters[0]
        });

        const sampleFilter = await Samples.getBy({
            "description": "TESTING SAMPLE"
        });


        expect(sampleFilter).toEqual([{
            "workOrder": sample.workOrder,
            "clientId": testClientIds[0],
            "description": "TESTING SAMPLE",
            "storage": "2-8 degrees",
            "methodId": testGenMethods[0],
            "chapterId": testChapters[0]
        }]);
    });

});