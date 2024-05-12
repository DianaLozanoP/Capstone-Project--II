"use strict";

/** Routes for clients. */

const jsonschema = require("jsonschema");


const express = require("express");
const { BadRequestError } = require("../expressError");
const Client = require("../models/clients");
const clientNewSchema = require("../schemas/clientNewSchema.json");
const updateClientSchema = require("../schemas/updateClientSchema.json");


const router = express.Router();

//GET ROUTE, look for all clients
router.get("/", async function (req, res, next) {
    try {
        const clients = await Client.findAll();
        return res.json({ clients });
    } catch (err) {
        return next(err);
    }
})

//GET ROUTE, look for a client based on the name

router.get("/:clientName", async function (req, res, next) {
    try {
        const clients = await Client.findBy(req.params.clientName);
        return res.json({ clients });
    } catch (err) {
        return next(err);
    }
})

//POST ROUTE
//Enter a new client into db

router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, clientNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const client = await Client.register(req.body);
        return res.status(201).json({ client });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:clientId", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, updateClientSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const client = await Client.update(req.params.clientId, req.body);
        return res.json({ client });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;