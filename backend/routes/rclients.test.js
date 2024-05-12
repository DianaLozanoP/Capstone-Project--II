"use strict";

const app = require("../app");

const request = require("supertest");
const Client = require("../models/clients");

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


describe("GET /clients", function () {
    test("works for all clients", async function () {

        const resp = await request(app)
            .get(`/clients`);

        expect(resp.body).toEqual({
            clients: [
                {
                    clientId: testClientIds[0],
                    clientName: 'Client1',
                    email: 'jackson@botanical.ca',
                    contactInfo: 'contactInfo1'
                },
                {
                    clientId: testClientIds[1],
                    clientName: 'Client2',
                    email: 'andrea@vitlab.ca',
                    contactInfo: 'contactInfo2'
                },
                {
                    clientId: testClientIds[2],
                    clientName: 'Client3',
                    email: 'rmejia@biohacking.com',
                    contactInfo: 'contactInfo3'
                }
            ]
        });
    });

    test("works: filtering by client Name", async function () {
        const resp = await request(app)
            .get(`/clients/Client2`);

        expect(resp.body).toEqual({
            clients: [
                {
                    clientId: testClientIds[1],
                    clientName: 'Client2',
                    email: 'andrea@vitlab.ca',
                    contactInfo: 'contactInfo2'
                },
            ],
        });
    });

    test("bad request if invalid query", async function () {
        const resp = await request(app)
            .get("/clients/nope");


        expect(resp.statusCode).toEqual(404);
    });
});

describe("POST /clients", function () {

    test("Post", async function () {

        const resp = await request(app)
            .post("/clients")
            .send({
                clientName: 'Adding client',
                email: 'edith@botanical.ca',
                contactInfo: 'contactInfo1'
            });

        const client = await Client.findBy('Adding client');

        // expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            client: {
                clientId: client[0].clientId,
                clientName: 'Adding client',
                email: 'edith@botanical.ca',
                contactInfo: 'contactInfo1'
            }
        });
    });

    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/clients")
            .send({
                contactInfo: 'contactInfo1'
            });
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/clients")
            .send({
                nonsense: "ahgauihauag"
            });
        expect(resp.statusCode).toEqual(400);
    });
});

describe("PATCH /clients/:clientId", function () {
    test("works", async function () {

        const resp = await request(app)
            .patch(`/clients/${testClientIds[0]}`)
            .send({
                email: 'testingemail@jest.ca'
            });

        expect(resp.body).toEqual({
            client: {
                clientId: testClientIds[0],
                clientName: 'Client1',
                email: 'testingemail@jest.ca',
                contactInfo: 'contactInfo1'
            },
        });
    });


    test("not found", async function () {
        const resp = await request(app)
            .patch(`/clients/nope`);

        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on clientId change attempt", async function () {
        const resp = await request(app)
            .patch(`/clients/${testClientIds[0]}`)
            .send({
                clientId: testClientIds[1]
            });
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on invalid data, number instead of string", async function () {
        const resp = await request(app)
            .patch(`/clients/${testClientIds[0]}`)
            .send({
                email: 5
            });
        expect(resp.statusCode).toEqual(400);
    });
});


