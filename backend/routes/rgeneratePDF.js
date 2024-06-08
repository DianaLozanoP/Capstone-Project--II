"use strict";

const express = require('express');
const router = express.Router();
const PDF = require("../models/PDF.js");

router.post("/", async function (req, res, next) {
    try {
        // Extract data from request body
        const { data } = req.body;
        console.log("Received PDF Data:", data);

        if (!data || !data.clientName || !data.description) {
            throw new Error('Invalid input data');
        }

        // Generate PDF buffer
        const pdfBuffer = await PDF.generatePDF(data);

        // Send the PDF buffer as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=generated_pdf.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;



