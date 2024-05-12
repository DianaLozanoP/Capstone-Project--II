"use strict";

const app = require("../app");

const request = require("supertest");

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
const Validation = require("../models/validations");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("GET /validations", function () {
    test("Filter by valId", async function () {
        const val = await Validation.create({
            clientId: testClientIds[0],
            workOrder: testWorkOrders[0],
            description: "ALOE VERA LOTION",
            methodId: testGenMethods[0],
            chapterId: testChapters[0],
            valDate: '2024-05-31',
            valMethod: 'TESTING THIS ROUTE'
        });
        const resp = await request(app)
            .get(`/validations/${val.valId}`);

        expect(resp.body).toEqual({
            validation:
            {
                valId: val.valId,
                clientId: testClientIds[0],
                workOrder: testWorkOrders[0],
                description: "ALOE VERA LOTION",
                methodId: testGenMethods[0],
                chapterId: testChapters[0],
                valDate: '2024-05-31T04:00:00.000Z',
                valMethod: 'TESTING THIS ROUTE'
            }
        });
    });

    test("works: filtering on description provided", async function () {
        const val = await Validation.create({
            clientId: testClientIds[0],
            workOrder: testWorkOrders[0],
            description: "ALOE VERA LOTION",
            methodId: testGenMethods[0],
            chapterId: testChapters[0],
            valDate: '2024-05-31',
            valMethod: 'TESTING THIS ROUTE'
        })

        const resp = await request(app)
            .get("/validations")
            .query({
                description: "aloe"
            });

        expect(resp.body).toEqual({
            validations: [
                {
                    valId: val.valId,
                    clientId: testClientIds[0],
                    workOrder: testWorkOrders[0],
                    description: "ALOE VERA LOTION",
                    methodId: testGenMethods[0],
                    chapterId: testChapters[0],
                    valDate: '2024-05-31T04:00:00.000Z',
                    valMethod: 'TESTING THIS ROUTE'
                },
            ],
        });
    });

    test("bad request if invalid filter key", async function () {
        const resp = await request(app)
            .get("/validations")
            .query({ nope: "nope" });

        expect(resp.statusCode).toEqual(400);
    });
});

describe("POST /validations", function () {

    test("Post", async function () {

        const resp = await request(app)
            .post("/validations")
            .send({
                clientId: testClientIds[0],
                workOrder: testWorkOrders[0],
                description: "ALOE VERA LOTION",
                methodId: testGenMethods[0],
                chapterId: testChapters[0],
                valDate: '2024-05-31',
                valMethod: 'TESTING THIS ROUTE'
            });

        const validation = await Validation.getBy({ description: "ALOE VERA LOTION" });

        console.log(validation)
        // expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            validation: {
                valId: validation[0].valId,
                clientId: testClientIds[0],
                workOrder: testWorkOrders[0],
                description: "ALOE VERA LOTION",
                methodId: testGenMethods[0],
                chapterId: testChapters[0],
                valDate: '2024-05-31T04:00:00.000Z',
                valMethod: 'TESTING THIS ROUTE'
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

describe("PATCH /validations/:valId", function () {
    test("works", async function () {
        const val = await Validation.create({
            clientId: testClientIds[0],
            workOrder: testWorkOrders[0],
            description: "ALOE VERA LOTION",
            methodId: testGenMethods[0],
            chapterId: testChapters[0],
            valDate: '2024-05-31',
            valMethod: 'TESTING THIS ROUTE'
        })

        const resp = await request(app)
            .patch(`/validations/${val.valId}`)
            .send({
                description: "UPDATING THIS VALIDATION"
            });

        expect(resp.body).toEqual({
            validation: {
                valId: val.valId,
                clientId: testClientIds[0],
                workOrder: testWorkOrders[0],
                description: "UPDATING THIS VALIDATION",
                methodId: testGenMethods[0],
                chapterId: testChapters[0],
                valDate: "2024-05-31T04:00:00.000Z",
                valMethod: 'TESTING THIS ROUTE'
            },
        });
    });


    test("not found", async function () {
        const resp = await request(app)
            .patch(`/validations/nope`)
            .send({
                name: "new nope",
            });

        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on val_id change attempt", async function () {
        const resp = await request(app)
            .patch(`/samples/${testWorkOrders[0]}`)
            .send({
                valId: "5",
            });
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on invalid data, number instead of string", async function () {
        const resp = await request(app)
            .patch(`/samples/${testWorkOrders[0]}`)
            .send({
                clientId: "UPDATING THIS VALIDATION WRONGLY"
            });
        expect(resp.statusCode).toEqual(400);
    });
});


