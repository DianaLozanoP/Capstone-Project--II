"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Media = require("../models/media.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testClientIds,
    testMedia,
    testWorkOrders,
    testEquip
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const newMedia = {
    daycode: '1144',
    mediaName: 'Tryptic Soy Broth',
    exp: '2024-05-15',
    reviewed: null
}

describe("Media model", () => {

    test("add()", async () => {

        const media = await Media.add(newMedia);
        // Convert calDue to a Date object
        const expectedCalDue = new Date("2024-05-15T05:00:00.000Z");

        expect(media).toEqual({
            "mediaId": media.mediaId,
            "daycode": '1144',
            "mediaName": 'Tryptic Soy Broth',
            "exp": "2024-05-15",
            "reviewed": null
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT daycode
            FROM media
            WHERE media_id= $1`, [media.mediaId]);

        expect(result.rows[0]).toEqual({ "daycode": "1144" })

    });


});

describe("Media model-using media_used TABLE AS WELL", () => {

    test("used()", async () => {
        //Check that entering into database gives me back what I'm expecting
        const media = await Media.used(testMedia[0], testWorkOrders[0]);

        expect(media).toEqual(
            {
                mediaId: testMedia[0],
                workOrder: testWorkOrders[0]
            }
        );

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT work_order
            FROM media_used
            WHERE media_id= $1`, [testMedia[0]]);

        expect(result.rows[0].work_order).toEqual(testWorkOrders[0])

    });
});


describe("Media model", () => {

    test("update()", async () => {
        const expectedCalDue = new Date("2024-05-15T05:00:00.000Z");
        //Check that entering into database gives me back what I'm expecting
        const media = await Media.update(testMedia[0],
            {
                "mediaName": "MEDIAUPDATE"
            }
        );

        expect(media).toEqual({
            "daycode": '1144',
            "mediaName": "MEDIAUPDATE",
            "exp": "2024-05-15",
            "reviewed": null
        });

        //Check that the data is actually inside the database
        const result = await db.query(
            `SELECT media_name
            FROM media
            WHERE media_id= $1`, [testMedia[0]]);

        expect(result.rows[0]).toEqual({ "media_name": "MEDIAUPDATE" })
    });
});