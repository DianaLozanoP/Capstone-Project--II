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
        const sample = await Sample.get(req.params.workOrder);
        return res.json({ sample });
    } catch (err) {
        return next(err);
    }
});

//GET ROUTE
//Filter based on clientId or description of sample
//Return all samples that meet criteria

router.get("/", async function (req, res, next) {
    const q = req.query;

    // If no query parameters are provided, return all samples
    if (Object.keys(q).length === 0) {
        try {
            const samples = await Sample.findAll();
            return res.json({ samples });
        } catch (err) {
            return next(err);
        }
    }

    // Convert q.clientId to an integer if it is defined
    if (q.clientId !== undefined) {
        q.clientId = parseInt(q.clientId, 10);
        if (isNaN(q.clientId)) {
            return next(new BadRequestError("clientId must be a valid integer"));
        }
    }

    try {
        // Validate the query parameters using JSON schema
        const validator = jsonschema.validate(q, getSamplesSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // Fetch the samples based on the filtered query parameters
        const samples = await Sample.getBy(q);
        return res.json({ samples });

    } catch (err) {
        return next(err);
    }
});

module.exports = router;


//POST route
//Create a new sample into database
//Return all info from sample

router.post("/", async function (req, res, next) {
    try {
        const { clientId, methodId, chapterId } = req.body;

        // Convert string values to numbers using parseInt or Number()
        const parsedClientId = parseInt(clientId, 10);
        const parsedMethodId = parseInt(methodId, 10);
        const parsedChapterId = parseInt(chapterId, 10);

        // Check if conversion was successful
        if (isNaN(parsedClientId) || isNaN(parsedMethodId) || isNaN(parsedChapterId)) {
            throw new Error("Invalid data types for clientId, methodId, or chapterId.");
        }

        // Create a new object with the parsed values and other fields
        const newData = {
            clientId: parsedClientId,
            methodId: parsedMethodId,
            chapterId: parsedChapterId,
            description: req.body.description,
            storage: req.body.storage
        };


        const validator = jsonschema.validate(newData, sampleNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const sample = await Sample.create(newData);

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