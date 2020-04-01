
module.exports = {

  generateDocx: function (inputPath, outputPath, data) {
    var JSZip = require('jszip');
    var Docxtemplater = require('docxtemplater');
    var fs = require('fs');
    var content = fs.readFileSync(inputPath, 'binary');
    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);
    doc.setData(data);
    try {
      doc.render()
    }
    catch (error) {
      var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      }
      //helper.consoleLog(JSON.stringify({ error: e }));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
    }

    var buf = doc.getZip().generate({ type: 'nodebuffer' });
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(outputPath, buf);
    //helper.consoleLog('File created at ' + outputPath);
  }
};