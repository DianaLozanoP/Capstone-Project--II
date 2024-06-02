"use strict";

/** Routes for media. */



const express = require("express");
const { BadRequestError } = require("../expressError");
const Media = require("../models/media")

const router = express.Router();

//GET ROUTE, look for all clients
router.get("/", async function (req, res, next) {
    try {
        const media = await Media.getAll();
        return res.json({ media });
    } catch (err) {
        return next(err);
    }
});

//POST ROUTE

router.post('/', async function (req, res, next) {
    try {
        const { workOrder, mediaId } = req.body;

        // Convert string values to numbers using parseInt or Number()
        const parsedworkOrder = parseInt(workOrder, 10);
        const parsedmediaId = parseInt(mediaId, 10);

        // Check if conversion was successful
        if (isNaN(parsedworkOrder) || isNaN(parsedmediaId)) {
            throw new Error("Invalid data types for mediaId or workOrder.");
        }

        const media = await Media.used(parsedmediaId, parsedworkOrder);
        return res.status(201).json({ media });

    } catch (err) {
        return next(err);
    }
})


module.exports = router;