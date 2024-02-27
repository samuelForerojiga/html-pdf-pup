const PDF = require('../lib/pdf');

/**
 * Module exports an object with a method to create PDF.
 * @author Samuel Forero
 */

module.exports = {
    /**
     * Creates a PDF from HTML content with provided options.
     * @param {string} html The HTML content to convert to PDF.
     * @param {Object} options The options for PDF generation.
     * @param {string} outputType The type of output desired ('buffer', 'stream', or 'exec').
     * @param {Function} callback The callback function to handle the result or error.
     * @returns {Promise|void} A promise if no callback is provided, otherwise void.
     */
    create: function createPdf(html, options, outputType, callback) {
        if (typeof outputType === 'function') {
            callback = outputType;
            outputType = 'exec';
        }
        try {
            const pdf = new PDF(html, options);
            if (outputType === 'buffer') {
                return pdf.toBuffer(callback);
            } else if (outputType === 'stream') {
                return pdf.toStream(callback);
            } else if (outputType === 'exec') {
                return pdf.exec(callback);
            } else {
                throw new Error('Invalid output type');
            }
        } catch (err) {
            return callback(err);
        }
    },
};
