"use strict";

const express = require('express');
const router = express.Router();
const PDF = require("../models/PDF.js");

router.post("/", async function (req, res, next) {
    try {
        const { data } = req.body;
        console.log("Received PDF Data:", data);

        if (!data || !data.clientName || !data.description) {
            throw new Error('Invalid input data');
        }

        // Generate PDF buffer
        const pdfBuffer = await PDF.generatePDF(data);

        // Optionally, you might want to send a URL or key for the uploaded PDF
        res.status(200).send('PDF uploaded successfully');

    } catch (error) {
        console.error('Error generating or uploading PDF:', error);
        res.status(500).send('Error generating or uploading PDF');
    }
});

module.exports = router;
