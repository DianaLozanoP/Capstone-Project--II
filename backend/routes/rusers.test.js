"use strict";


const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

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
    testUsers,
    u1Token,
    u2Token,
    adminToken
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /users", function () {
    test("works", async function () {
        const resp = await request(app)
            .get("/users");

        expect(resp.body).toEqual({
            users: [
                {
                    username: "u1",
                    firstName: "Testing",
                    lastName: "Number1",
                    email: "andrea@testing.com",
                    isAdmin: false
                },
                {
                    username: "u2",
                    firstName: "Testing",
                    lastName: "Number2",
                    email: "peter@testing.com",
                    isAdmin: false
                },
            ],
        });
    });
});

describe("GET /users/:username", function () {
    test("works", async function () {
        const resp = await request(app)
            .get(`/users/u1`);
        expect(resp.body).toEqual({
            user: {
                username: "u1",
                firstName: "Testing",
                lastName: "Number1",
                email: "andrea@testing.com",
                isAdmin: false
            },
        });
    });

    test("not found if user not found", async function () {
        const resp = await request(app)
            .get(`/users/nope`);
        expect(resp.statusCode).toEqual(404);
    });
});

describe("PATCH /users/:username", () => {
    test("works", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                firstName: "CHANGING THIS"
            });
        expect(resp.body).toEqual({
            user: {
                username: "u1",
                firstName: "CHANGING THIS",
                lastName: "Number1",
                email: "andrea@testing.com",
                isAdmin: false
            },
        });
    });


});

// test("unauth if not same user", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//             firstName: "New",
//         })
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
// });

// test("unauth for anon", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//             firstName: "New",
//         });
//     expect(resp.statusCode).toEqual(401);
// });

// test("not found if no such user", async function () {
//     const resp = await request(app)
//         .patch(`/users/nope`)
//         .send({
//             firstName: "Nope",
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
// });

test("bad request if invalid data", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
            firstName: 42,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
});

test("works: can set new password", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
            password: "new-password",
        });
    expect(resp.body).toEqual({
        user: {
            username: "u1",
            firstName: "Testing",
            lastName: "Number1",
            email: "andrea@testing.com",
            isAdmin: false
        },
    });
    const isSuccessful = await User.authenticate("u1", "new-password");
    expect(isSuccessful).toBeTruthy();
});
