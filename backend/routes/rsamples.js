"use strict";

/** Routes for samples. */

const jsonschema = require("jsonschema");


const express = require("express");
const { BadRequestError } = require("../expressError");
const Sample = require("../models/samples");
const getSamplesSchema = require("../schemas/getSamplesSchema.json");
const sampleNewSchema = require("../schemas/sampleNewSchema.json");
const updateSampleSchema = require("../schemas/updateSampleSchema.json");

const router = express.Router();

//GET ROUTE
//Based on the work order number
//Return all info about the sample
router.get("/:workOrder", async function (req, res, next) {
    try {
        const job = await Sample.get(req.params.workOrder);
        return res.json({ job });
    } catch (err) {
        return next(err);
    }
});

//GET ROUTE
//Filter based on clientId or description of sample
//Return all samples that meet criteria

router.get("/", async function (req, res, next) {
    const q = req.query;
    //numbers will arrive as strings from querystring
    //we want them as integers
    if (q.clientId !== undefined) q.clientId = + q.clientId;

    try {
        const validator = jsonschema.validate(q, getSamplesSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const samples = await Sample.getBy(q);
        return res.json({ samples });

    } catch (err) {
        return next(err);
    }
});

//POST route
//Create a new sample into database
//Return all info from sample

router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, sampleNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const sample = await Sample.create(req.body);
        return res.status(201).json({ sample });
    } catch (err) {
        return next(err);
    }
});

//UPDATE 
router.patch("/:clientId", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, updateSampleSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const sample = await Sample.update(req.params.clientId, req.body);
        return res.json({ sample });
    } catch (err) {
        return next(err);
    }
});

//DELETE route
//Delete a new sample from database

router.delete("/:workOrder", async function (req, res, next) {
    try {
        await Sample.remove(req.params.workOrder);
        return res.json({ deleted: req.params.workOrder });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;