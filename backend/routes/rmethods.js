"use strict";

/** Routes for methods. */



const express = require("express");
const { BadRequestError } = require("../expressError");
const Methods = require("../models/methods");

const router = express.Router();

//GET ROUTE, look for all clients
router.get("/", async function (req, res, next) {
    try {
        const methods = await Methods.getAll();
        return res.json({ methods });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;