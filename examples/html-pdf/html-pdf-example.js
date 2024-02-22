const { create } = require('../../lib/index');
const fs = require('fs');

/**
 * HTML to PDF Converter
 * Converts HTML content to a PDF file.
 * @module htmlToPdfConverter
 */

/**
 * Generates a PDF file from the provided HTML content.
 * @param {string} htmlContent The HTML content to convert to PDF.
 * @param {Object} options Options for PDF generation.
 * @param {string} options.format The paper format (e.g., 'A4').
 * @param {Object} options.margin The margins for the PDF document.
 * @param {string} options.margin.top The top margin.
 * @param {string} options.margin.bottom The bottom margin.
 * @param {string} options.margin.left The left margin.
 * @param {string} options.margin.right The right margin.
 * @param {string} outputType The output type ('buffer', 'stream', or 'exec').
 * @param {Function} callback The callback function to handle the result or error.
 * @returns {void}
 */
function generatePDF(htmlContent, options, outputType, callback) {
    create(htmlContent, options, outputType, (err, pdfBuffer) => {
        if (err) {
            console.error('Error generating PDF:', err);
            callback(err);
        } else {
            savePDF(pdfBuffer, callback);
        }
    });
}

/**
 * Saves the generated PDF buffer to a file.
 * @param {Buffer} pdfBuffer - The PDF buffer to save.
 * @param {Function} callback - The callback function to handle the result or error.
 * @returns {void}
 */
function savePDF(pdfBuffer, callback) {
    fs.writeFile('document.pdf', pdfBuffer, (err) => {
        if (err) {
            console.error('Error saving PDF:', err);
            callback(err);
        } else {
            console.log('PDF saved successfully.');
            callback(null);
        }
    });
}

module.exports = generatePDF;
