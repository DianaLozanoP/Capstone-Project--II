"use strict";

const puppeteer = require('puppeteer');

class PDF {
  static async generatePDF(data) {

    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      // Custom format to "June 06/2024"
      const [month, day, year] = formattedDate.split(' ');
      return `${month} ${day.slice(0, -1)}/${year}`;
    }

    let dateRelease = formatDate(data.releaseDate);
    let dateTested = formatDate(data.testDate);

    const inputDate = '2024-06-06T04:00:00.000Z';
    const formattedDate = formatDate(inputDate);
    console.log(formattedDate); // Output: "June 06/2024"


    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate PDF content using data
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

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' }); // Wait until the network is idle

    // Generate the PDF buffer
    const pdfBuffer = await page.pdf();

    await browser.close();

    return pdfBuffer;
  }
}

module.exports = PDF;


module.exports = PDF;