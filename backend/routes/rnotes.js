"use strict";

/** Routes for notes. */

const jsonschema = require("jsonschema");


const express = require("express");
const { BadRequestError } = require("../expressError");
const Notes = require("../models/notes");
const notesNewSchema = require("../schemas/notesNewSchema.json");
const getNotesSchema = require("../schemas/getNotesSchema.json");
const updateNotesSchema = require("../schemas/updateNotesSchema.json");

const router = express.Router();

//GET NOTES
//Filter depeding on the searchFilters
//Possible filters { workOrder, testDate, analyst, releaseDate }

router.get("/", async function (req, res, next) {
    const q = req.query;
    //numbers will arrive as strings from querystring
    //we want them as integers
    if (q.workOrder !== undefined) q.workOrder = + q.workOrder;

    try {
        const validator = jsonschema.validate(q, getNotesSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const labnotes = await Notes.findAll(q);
        return res.json({ labnotes });

    } catch (err) {
        return next(err);
    }
})

//POST NOTES
//Send { "workOrder", "testDate", "analyst", "procedure", "releaseDate", "results", "reviewed"}
//Return
//{
//     "labnotes": {
//         "workOrder": 1,
//         "testDate": "2024-04-21T04:00:00.000Z",
//         "analyst": "AL",
//         "procedure": "Dilute 10 grams of sample into 90 mL ph Buffer",
//         "releaseDate": "2024-04-30T04:00:00.000Z",
//         "results": "TAMC: No growth, YMCA: No growth",
//         "reviewed": "PT"
//     }
// }

router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, notesNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const labnotes = await Notes.create(req.body);
        return res.status(201).json({ labnotes })
    } catch (err) {
        return next(err);
    }
});



//UPDATE NOTES: 
//Able to update analyst, procedure, release_date, results, reviewed.

router.patch("/:workOrder", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, updateNotesSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const labnotes = await Notes.update(req.params.workOrder, req.body);
        return res.json({ labnotes });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;