const methods = require('./Methods');
const activityAPI = require('../Activities/Methods');

const { restart } = require('nodemon');
var pool = require('../../dbConfig').pool;

async function getContracts(req, res, next) {
  var contracts = await methods.getContracts(req, res, next);
  res.status(200).json(contracts);
}

async function getContractById(req, res, next, contractId) {

  var contract = await methods.getContractById(req, res, next, contractId);
  res.status(200).json(contract);
}

async function getContractTypes(req, res, next) {
  
  var contractType = await methods.getContractTypes(req, res, next);
  res.status(200).json(contractType);
}

async function searchContracts(req, res, next) {
  var searchResults = await methods.searchContracts(req, res, next);
  res.status(200).json(searchResults);
}

async function contractExists(req, res, next) {

  var row = await methods.contractExists(req, res, next);
  res.status(200).json(row);
}

async function insertContract(req, res, next) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    var contractId = await methods.insertInfoToContractTable(req, res, next, client);
    var ownerId = await methods.insertContractOwnerInfo(req, res, next, contractId, client);
    var activityId = await activityAPI.insertActivity(req, res, next, contractId, 'Δημιουργία Σύμβασης', client);

    await client.query('COMMIT');
  } catch (error) {
    next(error);
    await client.query('ROLLBACK');    
  }
  finally {
    client.release();
  }

  getContractById(req, res, next, contractId);
}

async function updateContract(req, res, next) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    var contractId = await methods.updateContract(req, res, next, client);
    await activityAPI.insertActivity(req, res, next, contractId, 'Επεξεργασία Σύμβασης', client);
    await client.query('COMMIT');
  } catch (error) {
    next(error);
    await client.query('ROLLBACK');    
  }
  finally {
    client.release();
  }

  getContractById(req, res, next, contractId);
}

async function deleteContract(req, res, next) {

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    var contractId = await methods.deleteContract(req, res, next);
    await activityAPI.insertActivity(req, res, next, contractId, 'Διαγραφή Σύμβασης', client);
    await client.query('COMMIT');
  } catch (error) {
    next(error);
    await client.query('ROLLBACK');    
  }
  finally {
    client.release();
  }

  res.status(200).json(contractId);
}

module.exports = {
  getContracts,
  getContractById,
  getContractTypes,
  searchContracts,
  insertContract,
  deleteContract,
  contractExists,
  updateContract
}



// const insertContractUsers = (req, res, next, contractId, usersToGiveAccessToContract) => {
//   var AllUsers = req.body.AllUsers;
//   var contractUsers = usersToGiveAccessToContract ? usersToGiveAccessToContract : req.body.contractStuff;
//   var sqlQuery = 'INSERT INTO "Ordering"."ContractUsers"("ContractId", "UserId")  VALUES ';
//   if (AllUsers)
//     getContractById(req, res, next, req.body.ContractId);
//   else {
//     for (var i = 0; i < contractUsers.length; i++) {
//       console.log('insertContractUsers: UserId:' + contractUsers[i].UserId ? contractUsers[i].UserId : contractUsers[i].Id)
//       sqlQuery += util.format('(%s,%s)', contractId, contractUsers[i].UserId ? contractUsers[i].UserId : contractUsers[i].Id)
//       if (i < contractUsers.length - 1)
//         sqlQuery += ','
//     }
//     sqlQuery += ' RETURNING * ';
//   }

//   pool.query(sqlQuery, (error, results) => {
//     if (error)
//       next(error);
//     else
//       getContractById(req, res, next, contractId);
//   })
// }

// const updateContractUsers = (req, res, next) => {

//   var giveAccessToAllUsers = req.body.AllUsers;
//   var serverContractUsers = req.body.contractStuff;
//   var usersToGiveAccessToContract = []
//   var usersToRemoveAccessFromContract = []

//   var sqlQuery = util.format('SELECT * FROM "Ordering"."ContractUsers" as cusr WHERE cusr."ContractId"=%s', helper.addQuotes(req.body.ContractId));
//   pool.query(sqlQuery, (error, results) => {
//     if (error)
//       next(error);
//     else {
//       if (giveAccessToAllUsers) {
//         for (let i = 0; i < results.rows.length; i++)
//           usersToRemoveAccessFromContract.push(results.rows[i].UserId)
//       }
//       else {
//         if (serverContractUsers && serverContractUsers.length > 0) {
//           for (let i = 0; i < serverContractUsers.length; i++) {
//             if (results.rows.find(o => o.UserId == serverContractUsers[i].UserId)) {
//             }
//             else
//               usersToGiveAccessToContract.push({ 'Id': serverContractUsers[i].UserId })
//           }
//         }

//         if (results.rows && results.rows.length > 0) {
//           for (let i = 0; i < results.rows.length; i++) {
//             if (serverContractUsers.find(o => o.UserId == results.rows[i].UserId)) {
//             }
//             else
//               usersToRemoveAccessFromContract.push(results.rows[i].UserId)
//           }
//         }
//       }

//       if (usersToRemoveAccessFromContract.length > 0)
//         removeAccessToContract(req, res, next, usersToRemoveAccessFromContract, usersToGiveAccessToContract);
//       else {
//         if (usersToGiveAccessToContract.length > 0)
//           giveAccessToContract(req, res, next, usersToGiveAccessToContract);
//         else
//           getContractById(req, res, next, req.body.ContractId)
//       }
//     }
//   })
// }

// const giveAccessToContract = (req, res, next, usersToGiveAccessToContract) => {
//   insertContractUsers(req, res, next, req.body.ContractId, usersToGiveAccessToContract)
// }

// const removeAccessToContract = (req, res, next, usersToRemoveAccessFromContract, usersToGiveAccessToContract) => {
//   if (usersToRemoveAccessFromContract && usersToRemoveAccessFromContract.length) {
//     var idsToRemove = '(';
//     for (let i = 0; i < usersToRemoveAccessFromContract.length; i++) {
//       if (i < usersToRemoveAccessFromContract.length - 1)
//         idsToRemove += usersToRemoveAccessFromContract[i] + ','
//       else
//         idsToRemove += usersToRemoveAccessFromContract[i]
//     }
//     idsToRemove += ')';

//     var sqlQuery = util.format('DELETE FROM "Ordering"."ContractUsers" as curs WHERE curs."ContractId"=%s AND curs."UserId" IN %s', req.body.ContractId, idsToRemove);
//     pool.query(sqlQuery, (error, results) => {
//       if (error)
//         next(error);
//       else {
//         if (usersToGiveAccessToContract && usersToGiveAccessToContract.length > 0)
//           giveAccessToContract(req, res, next, usersToGiveAccessToContract);
//         else
//           getContractById(req, res, next, req.body.ContractId)
//       }
//     })
//   }
// }