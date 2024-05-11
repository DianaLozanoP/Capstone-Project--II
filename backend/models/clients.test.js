"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Client = require("../models/clients.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testClientIds
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const clientData = {
    clientName: "Test Client",
    email: "testclient@example.com",
    contactInfo: "John Doe, +1234567890",
};

describe("Client model", () => {

    test("register()", async () => {

        const client = await Client.register(clientData);

        expect(client).toEqual({
            "clientId": client.clientId,
            "clientName": "Test Client",
            "contactInfo": "John Doe, +1234567890",
            "email": "testclient@example.com",
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT 
            client_id,
            client_name, 
            email, 
            contact_info 
            FROM clients
            WHERE client_id= $1`, [client.clientId]);

        expect(result.rows[0].client_name).toEqual("Test Client")

    });

    test("bad request with dupe", async function () {
        try {
            await Client.register(clientData);
            await Client.register(clientData);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

describe("Find all clients", () => {
    test("findAll()", async () => {
        const clients = await Client.findAll();

        expect(clients).toEqual([
            {
                clientName: 'Client1',
                email: 'jackson@botanical.ca',
                contactInfo: 'contactInfo1'
            },
            {
                clientName: 'Client2',
                email: 'andrea@vitlab.ca',
                contactInfo: 'contactInfo2'
            },
            {
                clientName: 'Client3',
                email: 'rmejia@biohacking.com',
                contactInfo: 'contactInfo3'
            }
        ])

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT 
            client_id,
            client_name, 
            email, 
            contact_info 
            FROM clients
            WHERE client_id= $1`, [testClientIds[0]]);

        expect(result.rows[0].client_name).toEqual("Client1")
    });
})

describe("Filter by name", () => {
    test("findBy()", async () => {

        const clients = await Client.findBy('Client1');

        expect(clients).toEqual(
            [{
                clientName: 'Client1',
                email: 'jackson@botanical.ca',
                contactInfo: 'contactInfo1'
            }]
        );
    });
});

describe("Update", () => {
    test("update()", async () => {

        const updatedEmail = "updatedclient@example.com";
        const updatedContactInfo = "Jane Doe, +9876543210";

        const updatedClient = await Client.update(testClientIds[0], {
            email: updatedEmail,
            contactInfo: updatedContactInfo,
        });

        expect(updatedClient).toEqual(expect.objectContaining({
            clientName: 'Client1',
            email: updatedEmail,
            contactInfo: updatedContactInfo,
        }));
    });

});
