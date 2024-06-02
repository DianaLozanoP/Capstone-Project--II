"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/rauth");
const notesRoutes = require("./routes/rnotes")
const clientsRoutes = require("./routes/rclients")
const samplesRoutes = require("./routes/rsamples")
const validationsRoutes = require("./routes/rvalidations")
const usersRoutes = require("./routes/rusers")
const methodsRoutes = require("./routes/rmethods")
const chaptersRoutes = require("./routes/rchapters")
const equipmentRoutes = require("./routes/requipment")
const mediaRoutes = require("./routes/rmedia")
const PDFRoutes = require("./routes/rgeneratePDF")

const app = express();

app.use(cors());
app.use(express.json());
// app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/clients", clientsRoutes);
app.use("/samples", samplesRoutes);
app.use("/validations", validationsRoutes);
app.use("/users", usersRoutes);
app.use("/methods", methodsRoutes);
app.use("/chapters", chaptersRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/media", mediaRoutes);
app.use("/generate_pdf", PDFRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;