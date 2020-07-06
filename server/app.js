
var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var InputData = require('./InputData/InputData');
var docxTemplatorMethods = require('./DocxTemplater/DocxTemplaterMethods');
const util = require('util');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var docxTemplatorRouter = require('./routes/docxtemplator');
var bodyParser = require("body-parser");
var cors = require('cors');
var helmet = require('helmet')
var app = express();

var dbContract = require('./Postgre/Queries/Contract')
var dbAccount = require('./Postgre/Queries/Account')
var dbError = require('./Postgre/Queries/Error')
var dbLogin = require('./Postgre/Queries/Login')
var dbParametric = require('./Postgre/Queries/Parametric')
var dbUserReservations = require('./Postgre/Queries/UserReservations')
var dbAay = require('./Postgre/Queries/AAY')
var dbBoardDecision = require('./Postgre/Queries/BoardDecision')
var dbDecisionCoordinatorDecentrilizedAdministration = require('./Postgre/Queries/DecisionCoordinatorDecentrilizedAdministration')
var dbCourtOfAuditors = require('./Postgre/Queries/CourtOfAuditors')
var dbAuthorDocumentedRequest = require('./Postgre/Queries/AuthorDocumentedRequest')
var dbSnippetPractical = require('./Postgre/Queries/SnippetPractical')
var dbCC = require('./Postgre/Queries/CC')
var dbAccountReservations = require('./Postgre/Queries/AccountReservations')

var helper = require('./HelperMethods/helpermethods')
const ENV = process.env.NODE_ENV;
app.use(helmet())
app.use(cors());
app.use(express.static(path.join(__dirname, "./WORD/templates")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/createTransmissionDocument', dbLogin.checkToken, function (req, res, next) {
//   var fs = require('fs');
//   let d = new Date();

//   var inputPath = path.resolve(__dirname, 'WORD/templates/in1.docx');
//   var outputPath = path.resolve(__dirname, 'WORD/templates/' + d.getHours() + d.getMinutes() + d.getSeconds() + '.docx');
//   var inputData = accountData.setDataForTransmissionAccount(req.body);
//   docxTemplatorMethods.generateDocx(inputPath, outputPath, inputData);
//   var pathUrl = req.path;
//   if (pathUrl !== '/') {
//     res.download(outputPath, function (err) {
//       if (err) {
//         helper.consoleLog('Handle error, but keep in mind the response may be partially-sent')
//       } else {
//         helper.consoleLog('decrement a download credit, etc.');
//       }
//       if (fs.existsSync(outputPath))
//         fs.unlinkSync(outputPath);
//     });
//   }
//   else {
//     next();
//   }
// });

app.post('/createAccountDocument', dbLogin.checkToken, function (req, res, next) {
  var fs = require('fs');

  let d = new Date();
  var inputPath = path.join(__dirname, "WORD/templates/account.docx")
  var outputPath = path.resolve(__dirname, 'WORD/templates/' + d.getHours() + d.getMinutes() + d.getSeconds() + '.docx');
  var inputData = InputData.setDataForAccountDocument(req.body);
  docxTemplatorMethods.generateDocx(inputPath, outputPath, inputData);
  var pathUrl = req.path;
  if (pathUrl !== '/') {
    res.download(outputPath, function (err) {
      if (err)
        helper.consoleLog('Handle error, but keep in mind the response may be partially-sent');
      else
        helper.consoleLog('decrement a download credit, etc.');

      if (fs.existsSync(outputPath))
        fs.unlinkSync(outputPath);
    });
  }
  else {
    next();
  }
});

app.post('/createTransmissionDocument', dbLogin.checkToken, function (req, res, next) {
  var fs = require('fs');

  let d = new Date();
  var inputPath = path.join(__dirname, "WORD/templates/transmission.docx")
  var outputPath = path.resolve(__dirname, 'WORD/templates/' + d.getHours() + d.getMinutes() + d.getSeconds() + '.docx');
  var inputData = InputData.setDataForTransmissionDocument(req.body);
  docxTemplatorMethods.generateDocx(inputPath, outputPath, inputData);
  var pathUrl = req.path;
  if (pathUrl !== '/') {
    res.download(outputPath, function (err) {
      if (err) {
        helper.consoleLog('Handle error, but keep in mind the response may be partially-sent');
      } else {
        helper.consoleLog('decrement a download credit, etc.');
      }
      fs.unlinkSync(outputPath);
    });
  }
  else {
    next();
  }
});

// app.post('/createAccountDocument', function (req, res, next) {
//   var fs = require('fs');

//   let d = new Date();
//   var inputPath = path.join(__dirname, "WORD/templates/account.docx")
//   var outputPath = path.resolve(__dirname, 'WORD/templates/' + d.getHours() + d.getMinutes() + d.getSeconds() + '.docx');
//   var inputData = InputData.setDataForAccountDocument(req.body);
//   docxTemplatorMethods.generateDocx(inputPath, outputPath, inputData);
//   var pathUrl = req.path;
//   if (pathUrl !== '/') {
//     res.download(outputPath, function (err) {
//       if (err) {
//         helper.consoleLog('Handle error, but keep in mind the response may be partially-sent');
//       } else {
//         helper.consoleLog('decrement a download credit, etc.');
//       }
//       fs.unlinkSync(outputPath);
//     });
//   }
//   else {
//     next();
//   }
// });

app.get('/login', dbLogin.login);
app.post('/logClientError', function (req, res, next) {
  var msgError = req.body && req.body.error ? req.body.error : '';
  var msgStack = req.body && req.body.stack ? req.body.stack : '';
  //var msg = util.format('Message: %s\n Stack %s\n', msgError, msgStack);
  var msg = 'Message: ' + msgError + '\nStack: ' + (msgStack.componentStack ? msgStack.componentStack.substring(0, 900) : '') + '\n';
  dbError.logError(req, res, next, msg, false, true)
})

app.post('/createuser', dbLogin.checkToken, dbLogin.createUser);
app.post('/updateuser', dbLogin.checkToken, dbLogin.updateUser);
app.post('/deleteuser', dbLogin.checkToken, dbLogin.deleteUser);
app.post('/createcontracttype', dbLogin.checkToken, dbParametric.createContractType);
app.post('/updatecontracttype', dbLogin.checkToken, dbParametric.updateContractType);
app.post('/deletecontracttype', dbLogin.checkToken, dbParametric.deleteContractType);
app.post('/createagency', dbLogin.checkToken, dbParametric.createAgency);
app.post('/updateagency', dbLogin.checkToken, dbParametric.updateAgency);
app.post('/deleteagency', dbLogin.checkToken, dbParametric.deleteAgency);
app.post('/createdirection', dbLogin.checkToken, dbParametric.createDirection);
app.post('/updatedirection', dbLogin.checkToken, dbParametric.updateDirection);
app.post('/deletedirection', dbLogin.checkToken, dbParametric.deleteDirection);
app.post('/createdepartment', dbLogin.checkToken, dbParametric.createDepartment);
app.post('/updatedepartment', dbLogin.checkToken, dbParametric.updateDepartment);
app.post('/deletedepartment', dbLogin.checkToken, dbParametric.deleteDepartment);
app.post('/createreservation', dbLogin.checkToken, dbParametric.createReservation);
app.post('/updatereservation', dbLogin.checkToken, dbParametric.updateReservation);
app.post('/deletereservation', dbLogin.checkToken, dbParametric.deleteReservation);
app.post('/createsignatory', dbLogin.checkToken, dbParametric.createSignatory);
app.post('/updatesignatory', dbLogin.checkToken, dbParametric.updateSignatory);
app.post('/deletesignatory', dbLogin.checkToken, dbParametric.deleteSignatory);
app.post('/createsignatorytype', dbLogin.checkToken, dbParametric.createSignatoryType);
app.post('/updatesignatorytype', dbLogin.checkToken, dbParametric.updateSignatoryType);
app.post('/deletesignatorytype', dbLogin.checkToken, dbParametric.deleteSignatoryType);
app.post('/deleteerrormessage', dbLogin.checkToken, dbParametric.deleteErrorMessage);

app.post('/createuserreservation', dbLogin.checkToken, dbUserReservations.createUserReservation);
app.post('/updateuserreservation', dbLogin.checkToken, dbUserReservations.updateUserReservation);
app.post('/deleteuserreservation', dbLogin.checkToken, dbUserReservations.deleteUserReservation);

app.get('/directions', dbLogin.checkToken, dbParametric.getDirections);
app.get('/contracttypes', dbLogin.checkToken, dbParametric.getContractTypes);
app.get('/agencies', dbLogin.checkToken, dbParametric.getAgencies);
app.get('/signatories', dbLogin.checkToken, dbParametric.getSignatories);
app.get('/signatorytypes', dbLogin.checkToken, dbParametric.getSignatoryTypes);
app.get('/errormessages', dbLogin.checkToken, dbParametric.getErrorMessages);
app.get('/users', dbLogin.checkToken, dbParametric.getUsers);
app.get('/userroles', dbLogin.checkToken, dbParametric.getUserRoles);
app.get('/reservations', dbLogin.checkToken, dbParametric.getReservations);
app.post('/contractexists', dbLogin.checkToken, dbContract.contractExists);
app.get('/contracts', dbLogin.checkToken, dbContract.getContracts);
//app.get('/contracts_webix', dbContract.getContracts_WEBIX);
app.get('/searchcontracts', dbContract.searchContracts);
app.post('/insertcontract', dbLogin.checkToken, dbContract.insertContract);
app.post('/deletecontract', dbLogin.checkToken, dbContract.deleteContract);
app.post('/updatecontract', dbLogin.checkToken, dbContract.updateContract);
app.get('/getfirstaccountprotocolinfo', dbLogin.checkToken, dbAccount.getFirstAccountProtocolInfo);
app.get('/getremainamountofcontract', dbLogin.checkToken, dbAccount.getRemainAmountOfContract);
app.get('/getaccountsinfo', dbLogin.checkToken, dbAccount.getAccountsInfo);

app.post('/getaccount', dbLogin.checkToken, dbAccount.getAccountById);
app.post('/insertaccount', dbLogin.checkToken, dbAccount.insertAccount);
app.post('/updateaccount', dbLogin.checkToken, dbAccount.updateAccount);

app.post('/insertdecisionboard', dbLogin.checkToken, dbBoardDecision.insert);
app.post('/updatedecisionboard', dbLogin.checkToken, dbBoardDecision.update);
app.post('/deletedecisionboard', dbLogin.checkToken, dbBoardDecision.remove);
app.post('/insertdecisioncoordinatordecentrilizedadministration', dbLogin.checkToken, dbDecisionCoordinatorDecentrilizedAdministration.insert);
app.post('/updatedecisioncoordinatordecentrilizedadministration', dbLogin.checkToken, dbDecisionCoordinatorDecentrilizedAdministration.update);
app.post('/deletedecisioncoordinatordecentrilizedadministration', dbLogin.checkToken, dbDecisionCoordinatorDecentrilizedAdministration.remove);
app.post('/insertcourtofauditors', dbLogin.checkToken, dbCourtOfAuditors.insert);
app.post('/updatecourtofauditors', dbLogin.checkToken, dbCourtOfAuditors.update);
app.post('/deletecourtofauditors', dbLogin.checkToken, dbCourtOfAuditors.remove);
app.post('/insertaay', dbLogin.checkToken, dbAay.insert);
app.post('/updateaay', dbLogin.checkToken, dbAay.update);
app.post('/deleteaay', dbLogin.checkToken, dbAay.remove);
app.post('/insertauthordocumentedrequest', dbLogin.checkToken, dbAuthorDocumentedRequest.insert);
app.post('/updateauthordocumentedrequest', dbLogin.checkToken, dbAuthorDocumentedRequest.update);
app.post('/deleteauthordocumentedrequest', dbLogin.checkToken, dbAuthorDocumentedRequest.remove);
app.post('/insertsnippetpractical', dbLogin.checkToken, dbSnippetPractical.insert);
app.post('/updatesnippetpractical', dbLogin.checkToken, dbSnippetPractical.update);
app.post('/deletesnippetpractical', dbLogin.checkToken, dbSnippetPractical.remove);
app.post('/getccfrompreviousaccount', dbLogin.checkToken, dbCC.getccfrompreviousaccount);
app.post('/syncaccountreservations', dbLogin.checkToken, dbAccountReservations.sync);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log('ENVIROMENT: ' + ENV)
console.log('__dirname: ' + __dirname)
if (ENV === 'production') {
  console.log('ENVIROMENT: ' + ENV)
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.use((req, res) => {
    console.log('Redirect to index.html')
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
  app.all('/*', function (req, res, next) {
    console.log('Accessing all urls except all above ...')
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}
else
 app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/docxtemplator', docxTemplatorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  helper.consoleLog('ERROR: ' + err.message)
  var errorMessage = 'Message: ' + err.message + '\nStack: ' + err.stack + '\n';
  dbError.logError(req, res, next, errorMessage.substring(0, 990), true, false)

  var inputPath = path.join(__dirname, "error_log.txt")
  fs.writeFile(inputPath, errorMessage, (err) => {
    if (err) throw err;
    helper.consoleLog('Error message saved!');
  });

  res.status(err.status || 500).json(err);
});

module.exports = app;
