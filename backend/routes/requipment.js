"use strict";

/** Routes for equipment. */



const express = require("express");
const { BadRequestError } = require("../expressError");
const Equipment = require("../models/equipment")

const router = express.Router();

//GET ROUTE, look for all clients
router.get("/", async function (req, res, next) {
    try {
        const equipment = await Equipment.getAll();
        return res.json({ equipment });
    } catch (err) {
        return next(err);
    }
});

//POST ROUTE

router.post('/', async function (req, res, next) {
    try {
        const { workOrder, equipId } = req.body;

        // Convert string values to numbers using parseInt or Number()
        const parsedworkOrder = parseInt(workOrder, 10);
        const parsedEquipId = parseInt(equipId, 10);

        // Check if conversion was successful
        if (isNaN(parsedworkOrder) || isNaN(parsedEquipId)) {
            throw new Error("Invalid data types for equipId or workOrder.");
        }

        const equipment = await Equipment.used(parsedEquipId, parsedworkOrder);
        return res.status(201).json({ equipment });
    } catch (err) {
        return next(err);
    }
})


module.exports = router;