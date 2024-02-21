const puppeteer = require('puppeteer');
const { Readable } = require('stream');
const assert = require('assert');

/**
 * PDF class providing methods to generate PDF from an HTML string using Puppeteer
 *
 * @param html
 * @param options
 * @constructor
 *
 * @author Samuel Forero
 */


function PDF(html, options) {
    /**
     *  HTML string from which the PDF will be generated
     *  @type {string}
     *
     *  Configuration options for generating the PDF
     *  @type {Object}
     */
    this.html = html;
    this.options = options;

    assert(typeof this.html === 'string' && this.html.length, "html-pdf: Can't create a pdf without an html string");
    this.options.timeout = parseInt(this.options.timeout, 10) || 30000;
}

/**
 * Generate a PDF and returns it as a buffer in a callback function
 * @param {Function} callback function to be called with the result or error
 */

PDF.prototype.toBuffer = async function PdfToBuffer(callback) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(this.html);
        const pdfBuffer = await page.pdf(this.options);
        await browser.close();

        callback(null, pdfBuffer);

    } catch (err) {
        callback(err, null);
    }
};

/**
 * Generates a PDF and returns it as a stream in al callback function
 * @param {Function} callback function to be called with the result or error
 */

PDF.prototype.toStream = async function PdfToStream(callback) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(this.html);
        const pdfBuffer = await page.pdf(this.options);
        await browser.close();

        const stream = new Readable();
        stream.push(pdfBuffer);
        stream.push(null);

        callback(null, stream);

    } catch (err) {
        callback(err, null);
    }
};

/**
 * Generates a PDF and returns it as a buffer directly through a promise.
 * @returns {Promise<Buffer>} A promise that will resolve with the generated PDF or reject with an error.
 */

PDF.prototype.exec = async function PdfExec(callback) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(this.html);

    try {
        const pdfBuffer = await page.pdf(this.options);
        await browser.close();
        callback(null, pdfBuffer);
    } catch (err) {
        await browser.close();
        callback(err, null);
    }
}