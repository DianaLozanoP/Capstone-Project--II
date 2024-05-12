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


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



/* GET /notes */

describe("GET /notes", function () {
    test("works: filtering", async function () {

        const resp = await request(app)
            .get("/notes")
            .query({ analyst: testUsers[0] });

        expect(resp.body).toEqual({
            labnotes: [
                {
                    "workOrder": testWorkOrders[0],
                    "testDate": "2024-05-30T04:00:00.000Z",
                    "analyst": testUsers[0],
                    "procedure": "THIS IS A TESTING PROCEDUREE",
                    "releaseDate": "2024-06-13T04:00:00.000Z",
                    "results": "No growth",
                    "reviewed": null
                },
            ],
        });
    });

    test("works: filtering on all filters", async function () {
        const resp = await request(app)
            .get("/notes")
            .query({
                workOrder: testWorkOrders[0],
                testDate: "2024-05-30",
                analyst: testUsers[0],
                releaseDate: "2024-06-13"
            });

        expect(resp.body).toEqual({
            labnotes: [
                {
                    "workOrder": testWorkOrders[0],
                    "testDate": "2024-05-30T04:00:00.000Z",
                    "analyst": testUsers[0],
                    "procedure": "THIS IS A TESTING PROCEDUREE",
                    "releaseDate": "2024-06-13T04:00:00.000Z",
                    "results": "No growth",
                    "reviewed": null
                },
            ],
        });
    });

    test("bad request if invalid filter key", async function () {
        const resp = await request(app)
            .get("/notes")
            .query({ nope: "nope" });


        expect(resp.statusCode).toEqual(400);
    });
});


describe("POST /notes", function () {

    test("Post", async function () {

        const resp = await request(app)
            .post("/notes")
            .send({
                workOrder: testWorkOrders[1],
                testDate: "2024-05-30",
                analyst: testUsers[0],
                procedure: "THESE ARE NEW NOTESSS",
                releaseDate: "2024-06-13",
                results: "No growth"
            });

        // expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            labnotes: {
                workOrder: testWorkOrders[1],
                testDate: "2024-05-30T04:00:00.000Z",
                analyst: testUsers[0],
                procedure: "THESE ARE NEW NOTESSS",
                releaseDate: "2024-06-13T04:00:00.000Z",
                results: "No growth",
                reviewed: null
            }
        });
    });

    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/notes")
            .send({
                analyst: testUsers[0],
                procedure: "THIS SHOULD GIVE US A FAIL"
            });
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/companies")
            .send({
                nonsense: "ahgauihauag"
            });
        expect(resp.statusCode).toEqual(404);
    });
});

describe("PATCH /notes/:work_order", function () {
    test("works", async function () {
        const resp = await request(app)
            .patch(`/notes/${testWorkOrders[0]}`)
            .send({
                procedure: "UPDATING THESE NOTES",
            });

        expect(resp.body).toEqual({
            labnotes: {
                workOrder: testWorkOrders[0],
                testDate: "2024-05-30T04:00:00.000Z",
                analyst: testUsers[0],
                procedure: "UPDATING THESE NOTES",
                releaseDate: "2024-06-13T04:00:00.000Z",
                results: "No growth",
                reviewed: null
            },
        });
    });


    test("not found", async function () {
        const resp = await request(app)
            .patch(`/notes/nope`)
            .send({
                name: "new nope",
            });

        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on work_order change attempt", async function () {
        const resp = await request(app)
            .patch(`/companies/${testWorkOrders[0]}`)
            .send({
                workOrder: 5,
            });
        expect(resp.statusCode).toEqual(404);
    });

    test("bad request on invalid data, number instead of string", async function () {
        const resp = await request(app)
            .patch(`/companies/${testWorkOrders[0]}`)
            .send({
                results: 12589
            });
        expect(resp.statusCode).toEqual(404);
    });
});


