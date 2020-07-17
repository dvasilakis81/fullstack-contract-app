const helper = require('../../HelperMethods/helpermethods')
const pool = require('../dbConfig').pool
const util = require('util')

// var types = require('pg').types
// types.setTypeParser(1700, function(val) {
//     return val.replace('.',',');
// });
//database: 'new_db',


function getQueryTotalContractsByUser(loginUserId) {
  return loginUserId
    ?
    util.format('(SELECT COUNT(*) AS "Total" FROM "Ordering"."Contract" as c WHERE c."OwnerId"=%s), ', helper.addQuotes(loginUserId))
    :
    '(SELECT COUNT(*) AS "Total" FROM "Ordering"."Contract"), ';
}

function getSelectFromClauses(loginUserId) {

  return 'SELECT *, ' +
    getQueryTotalContractsByUser(loginUserId) +
    '(SELECT json_agg(ContractOwner) FROM (SELECT * FROM "Ordering"."ContractOwner" as co WHERE c."Id" = co."ContractId") ContractOwner) AS ContractOwner, ' +
    '(SELECT json_agg(Account) FROM (SELECT acct."Number",acct."Start",acct."End",acct."AmountPure", acct."AmountFpa", acct."AmountTotal" FROM "Ordering"."Account" as acct WHERE c."Id" = acct."ContractId" ORDER BY acct."Number") Account) AS CreatedAccounts, ' +
    '(SELECT json_agg(ContractType) FROM (SELECT * FROM "Ordering"."ContractType" as ct WHERE c."ContractTypeId" = ct."ContractTypeId") ContractType) AS ContractType, ' +
    '(SELECT json_agg(DecisionBoard) FROM (SELECT * FROM "Ordering"."DecisionBoard" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."OrderNo") DecisionBoard) AS DecisionBoard, ' +
    '(SELECT json_agg(DecisionCoordinatorDecentrilizedAdministration) FROM (SELECT * FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."OrderNo") DecisionCoordinatorDecentrilizedAdministration) AS DecisionCoordinatorDecentrilizedAdministration, ' +
    '(SELECT json_agg(CourtOfAuditors) FROM (SELECT * FROM "Ordering"."CourtOfAuditors" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."OrderNo") CourtOfAuditors) AS CourtOfAuditors, ' +
    '(SELECT json_agg(AAY) FROM (SELECT * FROM "Ordering"."AAY" as aay WHERE aay."ContractId" = c."Id" ORDER BY aay."OrderNo") AAY) AS AAY, ' +
    '(SELECT json_agg(AuthorDocumentedRequest) FROM (SELECT * FROM "Ordering"."AuthorDocumentedRequest" as adr WHERE adr."ContractId" = c."Id" ORDER BY adr."OrderNo") AuthorDocumentedRequest) AS AuthorDocumentedRequest, ' +
    '(SELECT json_agg(SnippetPractical) FROM (SELECT * FROM "Ordering"."SnippetPractical" as sp WHERE sp."ContractId" = c."Id" ORDER BY sp."OrderNo") SnippetPractical) AS SnippetPractical ' +
    'FROM "Ordering"."Contract" as c '
}

function gerOrderBy() {
  return 'ORDER BY c."Start" DESC '
}

function checkIfLoginUserIsSupervisor(loginUserId) {
  return util.format(' %s IN (SELECT con."Supervisor" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ) ', helper.addQuotes(loginUserId));
}

function checkIfLoginUserIsDirector(loginUserId) {
  return util.format(' %s IN (SELECT con."Director" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ) ', helper.addQuotes(loginUserId));
}

const getContracts = (request, response, next) => {

  var loginUserInfo = request.body.loginUserInfo;
  var offset = parseInt(request.body.offset);
  var limit = parseInt(request.body.limit);
  //var where = util.format('WHERE (c."OwnerId"=%s OR c."AllUsers"=true OR %s IN (SELECT cus."UserId" FROM "Ordering"."ContractUsers" as cus WHERE cus."ContractId"=c."Id")) ', loginUserId, loginUserId);
  var where = util.format('WHERE c."OwnerId"=%s OR %s OR %s',
    helper.addQuotes(loginUserInfo.uid),
    checkIfLoginUserIsSupervisor(loginUserInfo.uid),
    checkIfLoginUserIsDirector(loginUserInfo.uid)
  );
  var sqlQuery = util.format('%s %s %s OFFSET %s LIMIT %s', getSelectFromClauses(loginUserInfo.uid), where, gerOrderBy(), offset, limit);

  console.log('sqlQuery: ' + sqlQuery);
  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get contracts: \n" + error.message);
    }
    else {
      helper.consoleLog(" Contracts requested\n");
      response.status(200).json(results.rows);
    }
  })
}

const getContractById = (req, res, next, contractId) => {
  var loginUserId = req.body.loginUserId;
  var where = util.format('WHERE c."Id"=%s', contractId);
  var sqlQuery = util.format('%s %s %s', getSelectFromClauses(loginUserId), where, gerOrderBy())

  console.log('getContractById : sqlQuery: ' + sqlQuery)
  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get contract: \n" + error.message);
    }
    else {
      helper.consoleLog("Contract with id " + contractId + " requested\n");
      res.status(200).json(results.rows[0]);
    }
  })
}

const getContractTypes = (request, response, next) => {
  pool.query('SELECT * FROM "Ordering"."ContractType"', (error, results) => {
    if (error)
      next(error);
    else
      response.status(200).json(results.rows)
  })
}

const searchContracts = (request, response, next) => {
  var filter = request.query.filter
  var loginUserId = parseInt(request.query.loginuserid)
  var where = 'WHERE ((LOWER(c."Title") LIKE LOWER(\'%' + filter + '%\')' + ' OR LOWER(c."ConcessionaireName") LIKE LOWER(\'%' + filter + '%\')) ' +
    'AND (c."OwnerId"=' + loginUserId + ' OR c."AllUsers"=true OR ' + loginUserId + ' IN (SELECT cus."UserId" FROM "Ordering"."ContractUsers" as cus WHERE cus."ContractId"=c."Id"))) ';

  var sqlQuery = util.format('%s %s %s %s', getSelectFromClauses(loginUserId), where, gerOrderBy(), 'OFFSET 0 LIMIT 100')

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to search contracts: \n" + error.message);
    }
    else {
      helper.consoleLog("Search Contracts requested\n");
      response.status(200).json(results.rows);
    }
  })
}

const contractExists = (req, res, next) => {
  var sqlQuery = util.format('SELECT * ' +
    'FROM "Ordering"."Contract" ' +
    'Where "Ordering"."Contract"."ProtocolNumber"=%s ', helper.addQuotes(req.body.ProtocolNumber))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      var contractExists = (results.rows.length > 0)
      helper.consoleLog("Contract exists:  " + contractExists);
      res.status(200).json(contractExists);
    }
  })
}

const insertContract = (req, res, next) => {

  var sqlQuery = util.format('INSERT INTO "Ordering"."Contract"("ContractTypeId", "Title",  "ProtocolNumber",  "ProtocolDate",  "KAE",  "Actor", ' +
    ' "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal",  ' +
    ' "Balance", "Start", "End", "NumberOfAccounts", "DirectionId", "DepartmentId", "DateCreated", "DateModified", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers", "LawArticle")  ' +
    ' VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
    ' RETURNING *',
    helper.addQuotes(req.body.ContractTypeId),
    helper.addQuotes(req.body.Title),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.KAE),
    helper.addQuotes(req.body.Actor),
    helper.addQuotes(req.body.CodeDirection),
    helper.addQuotes(req.body.AwardNumber),
    helper.addQuotes(req.body.AwardDate),
    helper.addQuotes(req.body.AwardAda),
    helper.addQuotes(req.body.CpvCode),
    helper.addQuotes(req.body.CpvTitle),
    helper.addQuotes(req.body.AmountPure),
    helper.addQuotes(req.body.AmountFpa),
    helper.addQuotes(req.body.AmountTotal),
    helper.addQuotes(req.body.Balance),
    helper.addQuotes(req.body.Start),
    helper.addQuotes(req.body.End),
    helper.addQuotes(req.body.NumberOfAccounts),
    helper.addQuotes(req.body.DirectionId),
    helper.addQuotes(req.body.DepartmentId),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(req.body.ConcessionaireName),
    helper.addQuotes(req.body.ConcessionaireAFM),
    req.body.HasDownPayment,
    helper.addQuotes(req.body.FpaValue),
    helper.addQuotes(req.body.OwnerId),
    req.body.AllUsers,
    helper.addQuotes(req.body.LawArticle))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      if (req.body.owner)
        insertContractOwnerInfo(req, res, next, results.rows[0].Id);
      else
        getContractById(req, res, next, results.rows[0].Id);
  })
}

const insertContractUsers = (req, res, next, contractId, usersToGiveAccessToContract) => {
  var AllUsers = req.body.AllUsers;
  var contractUsers = usersToGiveAccessToContract ? usersToGiveAccessToContract : req.body.contractStuff;
  var sqlQuery = 'INSERT INTO "Ordering"."ContractUsers"("ContractId", "UserId")  VALUES ';
  if (AllUsers)
    getContractById(req, res, next, req.body.ContractId);
  else {
    for (var i = 0; i < contractUsers.length; i++) {
      console.log('insertContractUsers: UserId:' + contractUsers[i].UserId ? contractUsers[i].UserId : contractUsers[i].Id)
      sqlQuery += util.format('(%s,%s)', contractId, contractUsers[i].UserId ? contractUsers[i].UserId : contractUsers[i].Id)
      if (i < contractUsers.length - 1)
        sqlQuery += ','
    }
    sqlQuery += ' RETURNING * ';
  }

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      getContractById(req, res, next, contractId);
  })
}

const insertContractOwnerInfo = (req, res, next, contractId) => {
  var owner = req.body.owner;

  var sqlQuery = 'INSERT INTO "Ordering"."ContractOwner"("ContractId", "UserId", "Direction", "Department", "Name", "Supervisor", "Director")  VALUES ';
  sqlQuery += util.format('(%s,%s,%s,%s,%s,%s,%s)',
  contractId, 
  helper.addQuotes(owner.uid), 
  helper.addQuotes(owner.ou), 
  helper.addQuotes(owner.departmentNumber), 
  helper.addQuotes(owner.cn), 
  helper.addQuotes(owner.supervisor), 
  helper.addQuotes(owner.director));
  sqlQuery += ' RETURNING * ';

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      getContractById(req, res, next, contractId);
  })
}


const updateContractUsers = (req, res, next) => {

  var giveAccessToAllUsers = req.body.AllUsers;
  var serverContractUsers = req.body.contractStuff;
  var usersToGiveAccessToContract = []
  var usersToRemoveAccessFromContract = []

  var sqlQuery = util.format('SELECT * FROM "Ordering"."ContractUsers" as cusr WHERE cusr."ContractId"=%s', helper.addQuotes(req.body.ContractId));
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (giveAccessToAllUsers) {
        for (let i = 0; i < results.rows.length; i++)
          usersToRemoveAccessFromContract.push(results.rows[i].UserId)
      }
      else {
        if (serverContractUsers && serverContractUsers.length > 0) {
          for (let i = 0; i < serverContractUsers.length; i++) {
            if (results.rows.find(o => o.UserId == serverContractUsers[i].UserId)) {
            }
            else
              usersToGiveAccessToContract.push({ 'Id': serverContractUsers[i].UserId })
          }
        }

        if (results.rows && results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            if (serverContractUsers.find(o => o.UserId == results.rows[i].UserId)) {
            }
            else
              usersToRemoveAccessFromContract.push(results.rows[i].UserId)
          }
        }
      }

      if (usersToRemoveAccessFromContract.length > 0)
        removeAccessToContract(req, res, next, usersToRemoveAccessFromContract, usersToGiveAccessToContract);
      else {
        if (usersToGiveAccessToContract.length > 0)
          giveAccessToContract(req, res, next, usersToGiveAccessToContract);
        else
          getContractById(req, res, next, req.body.ContractId)
      }
    }
  })
}

const giveAccessToContract = (req, res, next, usersToGiveAccessToContract) => {
  insertContractUsers(req, res, next, req.body.ContractId, usersToGiveAccessToContract)
}

const removeAccessToContract = (req, res, next, usersToRemoveAccessFromContract, usersToGiveAccessToContract) => {
  if (usersToRemoveAccessFromContract && usersToRemoveAccessFromContract.length) {
    var idsToRemove = '(';
    for (let i = 0; i < usersToRemoveAccessFromContract.length; i++) {
      if (i < usersToRemoveAccessFromContract.length - 1)
        idsToRemove += usersToRemoveAccessFromContract[i] + ','
      else
        idsToRemove += usersToRemoveAccessFromContract[i]
    }
    idsToRemove += ')';

    var sqlQuery = util.format('DELETE FROM "Ordering"."ContractUsers" as curs WHERE curs."ContractId"=%s AND curs."UserId" IN %s', req.body.ContractId, idsToRemove);
    pool.query(sqlQuery, (error, results) => {
      if (error)
        next(error);
      else {
        if (usersToGiveAccessToContract && usersToGiveAccessToContract.length > 0)
          giveAccessToContract(req, res, next, usersToGiveAccessToContract);
        else
          getContractById(req, res, next, req.body.ContractId)
      }
    })
  }
}

const updateContract = (req, res, next) => {

  var sqlQuery = util.format('UPDATE "Ordering"."Contract" ' +
    'SET "ContractTypeId"=%s,"Title"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"KAE"=%s,"Actor"=%s,' +
    '"CodeDirection"=%s,"AwardNumber"=%s,"AwardDate"=%s,"AwardAda"=%s,"CpvCode"=%s,"CpvTitle"=%s,"AmountPure"=%s,"AmountFpa"=%s,"AmountTotal"=%s,' +
    '"Balance"=%s,"Start"=%s,"End"=%s,"NumberOfAccounts"=%s,"DirectionId"=%s,' +
    '"DepartmentId"=%s,"DateModified"=%s,"ConcessionaireName"=%s,"ConcessionaireAFM"=%s,"HasDownPayment"=%s,"FpaValue"=%s, "AllUsers"=%s,"LawArticle"=%s ' +
    'WHERE "Id"=%s ' +
    'RETURNING * ',
    helper.addQuotes(req.body.ContractTypeId),
    helper.addQuotes(req.body.Title),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.KAE),
    helper.addQuotes(req.body.Actor),
    helper.addQuotes(req.body.CodeDirection),
    helper.addQuotes(req.body.AwardNumber),
    helper.addQuotes(req.body.AwardDate),
    helper.addQuotes(req.body.AwardAda),
    helper.addQuotes(req.body.CpvCode),
    helper.addQuotes(req.body.CpvTitle),
    helper.addQuotes(req.body.AmountPure),
    helper.addQuotes(req.body.AmountFpa),
    helper.addQuotes(req.body.AmountTotal),
    helper.addQuotes(req.body.Balance),
    helper.addQuotes(req.body.Start),
    helper.addQuotes(req.body.End),
    helper.addQuotes(req.body.NumberOfAccounts),
    helper.addQuotes(req.body.DirectionId),
    helper.addQuotes(req.body.DepartmentId),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(req.body.ConcessionaireName),
    helper.addQuotes(req.body.ConcessionaireAFM),
    req.body.HasDownPayment,
    helper.addQuotes(req.body.FpaValue),
    req.body.AllUsers,
    helper.addQuotes(req.body.LawArticle),
    req.body.ContractId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      updateContractUsers(req, res, next);
  })

}

const deleteContract = (req, res, next) => {

  var id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."Contract" WHERE "Id"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

module.exports = {
  searchContracts,
  getContracts,
  getContractTypes,
  insertContract,
  deleteContract,
  contractExists,
  updateContract,
  getContractById
}
