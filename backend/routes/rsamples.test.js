"use strict";

const app = require("../app");

const request = require("supertest");
const Sample = require("../models/samples");

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


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("GET /samples", function () {
    test("works when work_order provided", async function () {

        const resp = await request(app)
            .get(`/samples/${testWorkOrders[0]}`);

        expect(resp.body).toEqual({
            sample:
            {
                workOrder: testWorkOrders[0],
                clientId: testClientIds[0],
                description: "Honey Healing Ointment 35g",
                storage: "Room Temperature",
                methodId: testGenMethods[0],
                chapterId: testChapters[0]
            }
        });
    });

    test("works: filtering on description provided", async function () {
        const resp = await request(app)
            .get("/samples")
            .query({
                description: "Honey Healing"
            });

        expect(resp.body).toEqual({
            samples: [
                {
                    workOrder: testWorkOrders[0],
                    clientId: testClientIds[0],
                    description: "Honey Healing Ointment 35g",
                    storage: "Room Temperature",
                    methodId: testGenMethods[0],
                    chapterId: testChapters[0]
                },
            ],
        });
    });

    test("bad request if invalid filter key", async function () {
        const resp = await request(app)
            .get("/samples")
            .query({ nope: "nope" });


        expect(resp.statusCode).toEqual(400);
    });
});

describe("POST /samples", function () {

    test("Post", async function () {

        const resp = await request(app)
            .post("/samples")
            .send({
                clientId: testClientIds[0],
                description: "TESTING SAMPLE ENTERING",
                storage: "2-8DEGREES",
                methodId: testGenMethods[0],
                chapterId: testChapters[0]
            });

        const sample = await Sample.getBy({ description: "TESTING SAMPLE ENTERING" })
        // expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            sample: {
                workOrder: sample[0].workOrder,
                clientId: testClientIds[0],
                description: "TESTING SAMPLE ENTERING",
                storage: "2-8DEGREES",
                methodId: testGenMethods[0],
                chapterId: testChapters[0]
            }
        });
    });

    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/samples")
            .send({
                clientId: testClientIds[0],
                description: "TESTING SAMPLE WRONG"
            });
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/samples")
            .send({
                nonsense: "ahgauihauag"
            });
        expect(resp.statusCode).toEqual(400);
    });
});

describe("PATCH /samples/:work_order", function () {
    test("works", async function () {
        const resp = await request(app)
            .patch(`/samples/${testWorkOrders[0]}`)
            .send({
                description: "UPDATING THIS SAMPLEE"
            });

        expect(resp.body).toEqual({
            sample: {
                workOrder: testWorkOrders[0],
                clientId: testClientIds[0],
                description: "UPDATING THIS SAMPLEE",
                storage: "Room Temperature",
                methodId: testGenMethods[0],
                chapterId: testChapters[0]
            },
        });
    });


    test("not found", async function () {
        const resp = await request(app)
            .patch(`/samples/nope`)
            .send({
                name: "new nope",
            });

        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on work_order change attempt", async function () {
        const resp = await request(app)
            .patch(`/samples/${testWorkOrders[0]}`)
            .send({
                workOrder: "5",
            });
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on invalid data, number instead of string", async function () {
        const resp = await request(app)
            .patch(`/samples/${testWorkOrders[0]}`)
            .send({
                clientId: "UPDATING THIS SAMPLEE"
            });
        expect(resp.statusCode).toEqual(400);
    });
});


