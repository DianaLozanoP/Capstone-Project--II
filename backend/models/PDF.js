"use strict";

const puppeteer = require('puppeteer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class PDF {
  static async generatePDF(data) {
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      const [month, day, year] = formattedDate.split(' ');
      return `${month} ${day.slice(0, -1)}/${year}`;
    }

    let dateRelease = formatDate(data.releaseDate);
    let dateTested = formatDate(data.testDate);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Sample PDF</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { color: #333; }
              body { margin: 0 0 10px 20px; }
            </style>
        </head>
        <body>
            <h4>${dateRelease}</h4>
            <br></br>
            <h5>${data.clientName}</h5>
            <h5>${data.description}</h5>
            <br></br>
            <p>The aforementioned sample was tested on ${dateTested} for sterility following the USP-NF 2024, Issue 1 <71> guidelines.</p>
            <br></br>
            <p>The results after 14 days of incubation were no growth observed for Fluid Thioglycollate Medium (FTM) and 
            for Trypticase Soy Broth (TSB).</p>
            <br></br>
            <br></br>
            <h4>Microbiology Supervisor</h4>
        </body>
        </html>
      `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf();
    await browser.close();

    // Upload the PDF buffer to S3
    const params = {
      Bucket: 'doculab-bucket', // replace with your S3 bucket name
      Key: `pdfs/generated_pdf_${Date.now()}.pdf`, // unique filename
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      ACL: 'public-read' // set appropriate permissions
    };

    try {
      await s3.upload(params).promise();
      console.log('PDF uploaded successfully to S3');
    } catch (error) {
      console.error('Error uploading PDF to S3:', error);
      throw new Error('Error uploading PDF to S3');
    }

    return pdfBuffer; // You might want to return the URL or key for accessing the file
  }
}

module.exports = PDF;
