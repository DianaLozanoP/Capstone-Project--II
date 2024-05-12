"use strict";

/** Routes for samples. */

const jsonschema = require("jsonschema");



const express = require("express");
const { BadRequestError } = require("../expressError");
const Validation = require("../models/validations");
const getValidationSchema = require("../schemas/getValidationSchema.json");
const validationNewSchema = require("../schemas/validationNewSchema.json");
const updateValidationSchema = require("../schemas/updateValidationSchema.json");

const router = express.Router();

//GET ROUTE
//Based on the validation id number
//Return all info about the sample
router.get("/:valId", async function (req, res, next) {
    try {
        const validation = await Validation.get(req.params.valId);
        return res.json({ validation });
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
        const validator = jsonschema.validate(q, getValidationSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const validations = await Validation.getBy(q);
        return res.json({ validations });

    } catch (err) {
        return next(err);
    }
});

//POST route
//Create a new sample into database
//Return all info from sample

router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, validationNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const validation = await Validation.create(req.body);
        return res.status(201).json({ validation });
    } catch (err) {
        return next(err);
    }
});

//UPDATE Validations: 
//Able to update all data except valId

router.patch("/:valId", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, updateValidationSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const validation = await Validation.update(req.params.valId, req.body);
        return res.json({ validation });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;