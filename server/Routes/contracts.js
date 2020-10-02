var Router = require('express-promise-router');

var dbLogin = require('../Postgre/API/LoginLDAP');
var dbContract = require('../Postgre/API/Contracts/ContractAPI');

const router = new Router();
module.exports = router;

router.post('/contractexists', dbLogin.checkToken, dbContract.contractExists);
router.post('/contracts', dbLogin.checkToken, dbContract.getContracts);
router.get('/searchcontracts', dbLogin.checkToken, dbContract.searchContracts);
router.post('/insertcontract', dbLogin.checkToken, dbContract.insertContract);
router.post('/deletecontract', dbLogin.checkToken, dbContract.deleteContract);
router.post('/updatecontract', dbLogin.checkToken, dbContract.updateContract);