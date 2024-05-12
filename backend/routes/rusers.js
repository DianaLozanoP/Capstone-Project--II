"use strict";

/** Routes for samples. */

const jsonschema = require("jsonschema");



const express = require("express");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNewSchema.json");
const userUpdateSchema = require("../schemas/userUpdateSchema.json");


const router = express.Router();

//GET ROUTE
//Find all users

router.get("/", async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

//GET ROUTE
//Use an specific userName

router.get("/:userName", async function (req, res, next) {
    try {
        const user = await User.get(req.params.userName);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});


//POST ROUTE

/** POST / { user }  => { user, token }
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 **/

// router.post("/", async function (req, res, next) {
//     try {
//         const validator = jsonschema.validate(req.body, userNewSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }

//         const user = await User.register(req.body);
//         const token = createToken(user);
//         return res.status(201).json({ user, token });
//     } catch (err) {
//         return next(err);
//     }
// });

//PATCH ROUTE


router.patch("/:username", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;