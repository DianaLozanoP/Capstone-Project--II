"use strict";

/** Routes for methods. */



const express = require("express");
const { BadRequestError } = require("../expressError");
const Chapters = require("../models/chapters")

const router = express.Router();

//GET ROUTE, look for all clients
router.get("/", async function (req, res, next) {
    try {
        const chapters = await Chapters.getAll();
        return res.json({ chapters });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;