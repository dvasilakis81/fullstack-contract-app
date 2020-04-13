

function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}
function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors.map(function (error) {
      return error.properties.explanation;
    }).join("\n");
    console.log('errorMessages', errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}

module.exports = {
  generateDocx: function (inputPath, outputPath, data) {
    //var JSZip = require('jszip');  
    var PizZip = require('pizzip');
    var Docxtemplater = require('docxtemplater');
    var fs = require('fs');
    //var inp = 'c:\\Projects\\Node\\fullstack-contract-app\\server\\WORD\\templates\\input.docx'
    var content = fs.readFileSync(inputPath, 'binary');
    var zip = new PizZip(content);
    var doc;
    try {
      doc = new Docxtemplater(zip);
    } catch (error) {
      // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
      errorHandler(error);
    }
    
    //doc.loadZip(zip);
    doc.setData(data);
    // doc.setData({
    //   first_name: 'John',
    //   last_name: 'Doe',
    //   phone: '0652455478',
    //   description: 'New Website'
    //   });
      
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