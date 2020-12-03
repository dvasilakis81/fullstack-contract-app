const util = require('util');
const helper = require('../../../HelperMethods/helpermethods');

function query_insertcontract(req) {
  var contractInfo = req.body.contractInfo;

  var sqlQuery = util.format('INSERT INTO "Ordering"."Contract"("ContractTypeId", "Title",  "ProtocolNumber",  "ProtocolDate",  "KAE",  "Actor", ' +
    ' "CodeDirection", "AwardNumber", "AwardDate", "AwardAda", "CpvCode", "CpvTitle", "AmountPure", "AmountFpa", "AmountTotal",  ' +
    ' "Balance", "Start", "End", "NumberOfAccounts", "Direction", "Department", "DateCreated", "DateModified", "ConcessionaireName", "ConcessionaireAFM", "HasDownPayment", "FpaValue", "OwnerId", "AllUsers", "LawArticle","Discreet","AccountPer")  ' +
    ' VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
    ' RETURNING *',
    helper.addQuotes(contractInfo.ContractTypeId),
    helper.addQuotes(contractInfo.Title || ''),
    helper.addQuotes(contractInfo.ProtocolNumber),
    helper.addQuotes(contractInfo.ProtocolDate),
    helper.addQuotes(contractInfo.KAE),
    helper.addQuotes(contractInfo.Actor),
    helper.addQuotes(contractInfo.CodeDirection),
    helper.addQuotes(contractInfo.AwardNumber),
    helper.addQuotes(contractInfo.AwardDate),
    helper.addQuotes(contractInfo.AwardAda || ''),
    helper.addQuotes(contractInfo.CpvCode || ''),
    helper.addQuotes(contractInfo.CpvTitle || ''),
    helper.addQuotes(contractInfo.AmountPure),
    helper.addQuotes(contractInfo.AmountFpa),
    helper.addQuotes(contractInfo.AmountTotal),
    helper.addQuotes(contractInfo.Balance),
    helper.addQuotes(contractInfo.Start),
    helper.addQuotes(contractInfo.End),
    helper.addQuotes(contractInfo.NumberOfAccounts),
    helper.addQuotes(contractInfo.Direction),
    helper.addQuotes(contractInfo.Department),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(contractInfo.ConcessionaireName || ''),
    helper.addQuotes(contractInfo.ConcessionaireAFM || ''),
    contractInfo.HasDownPayment,
    helper.addQuotes(contractInfo.FpaValue),
    helper.addQuotes(contractInfo.OwnerId),
    contractInfo.AllUsers,
    helper.addQuotes(contractInfo.LawArticle || ''),
    helper.addQuotes(contractInfo.Discreet || ''),
    helper.addQuotes(contractInfo.AccountPer));

  return sqlQuery;
}

function query_insertcontractowner(req, contractId) {
  var owner = req.body.loginUserInfo;

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

  return sqlQuery;
}

function query_getcontracts(req) {

  // return util.format('SELECT * FROM "Ordering"."Contract" as c ' + 
  // 'INNER JOIN "Ordering"."Account" as a ' +
  // ' ON a."ContractId"=c."Id"')

  var loginUserInfo = req.body.loginUserInfo;
  var select = getSelectFromClauses(loginUserInfo);
  var where = getWhere(loginUserInfo);
  var order = 'ORDER BY c."Start" DESC ';
  var offset = parseInt(req.body.offset);
  var limit = parseInt(req.body.limit);

  return util.format('%s %s %s OFFSET %s LIMIT %s', select, where, order, offset, limit);
}

function query_getcontractbyid(req, contractId) {
  var cid = contractId ? contractId : req.body.contractId;
  return util.format('%s %s', getSelectFromClauses(req.body.loginUserInfo), util.format('WHERE c."Id"=%s', cid));
}

function query_getcontracttypes() {
  return util.format('SELECT * FROM "Ordering"."ContractType"');
}

function getQueryTotalContractsByUser(loginUserInfo) {
  return util.format('(SELECT COUNT(*) AS "Total" FROM "Ordering"."Contract" as c %s), ', getWhere(loginUserInfo));
}

function getWhere(loginUserInfo) {
  return util.format('WHERE (c."OwnerId"=%s OR %s OR %s OR %s OR %s OR %s)',
    helper.addQuotes(loginUserInfo.uid),
    checkIfLoginUserIsTheGeneralManager(loginUserInfo),
    checkIfLoginUserIsTheMayor(loginUserInfo),
    checkIfLoginUserBelongToSameDirectionAndDepartment(loginUserInfo),
    checkIfLoginUserIsSupervisor(loginUserInfo),
    checkIfLoginUserIsDirector(loginUserInfo)
  );
}

function getSelectFromClauses(loginUserInfo) {

  return 'SELECT *, ' +
    getQueryTotalContractsByUser(loginUserInfo) +
    '(SELECT json_agg(ContractOwner) FROM (SELECT * FROM "Ordering"."ContractOwner" as co WHERE c."Id" = co."ContractId") ContractOwner) AS ContractOwner, ' +
    '(SELECT json_agg(Account) FROM (SELECT acct."Number",acct."Start",acct."End",acct."AmountPure", acct."AmountFpa", acct."AmountTotal" FROM "Ordering"."Account" as acct WHERE c."Id" = acct."ContractId" ORDER BY acct."Number") Account) AS CreatedAccounts, ' +
    '(SELECT json_agg(ContractType) FROM (SELECT * FROM "Ordering"."ContractType" as ct WHERE c."ContractTypeId" = ct."ContractTypeId") ContractType) AS ContractType, ' +
    // '(SELECT json_agg(Direction) FROM (SELECT * FROM "Ordering"."Direction" as dir WHERE c."DirectionId" = dir."DirectionId") Direction) AS Direction, ' +
    // '(SELECT json_agg(Department) FROM (SELECT * FROM "Ordering"."Department" as dep WHERE c."DepartmentId" = dep."DepartmentId") Department) AS Department, ' +
    '(SELECT json_agg(Activities) FROM (SELECT * FROM "Ordering"."Activities" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."Created" DESC) Activities) AS Activities, ' +
    '(SELECT json_agg(DecisionBoard) FROM (SELECT * FROM "Ordering"."DecisionBoard" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."OrderNo") DecisionBoard) AS DecisionBoard, ' +
    '(SELECT json_agg(DecisionCoordinatorDecentrilizedAdministration) FROM (SELECT * FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."OrderNo") DecisionCoordinatorDecentrilizedAdministration) AS DecisionCoordinatorDecentrilizedAdministration, ' +
    '(SELECT json_agg(CourtOfAuditors) FROM (SELECT * FROM "Ordering"."CourtOfAuditors" as dp WHERE dp."ContractId" = c."Id" ORDER BY dp."OrderNo") CourtOfAuditors) AS CourtOfAuditors, ' +
    '(SELECT json_agg(AAY) FROM (SELECT * FROM "Ordering"."AAY" as aay WHERE aay."ContractId" = c."Id" ORDER BY aay."OrderNo") AAY) AS AAY, ' +
    '(SELECT json_agg(AuthorDocumentedRequest) FROM (SELECT * FROM "Ordering"."AuthorDocumentedRequest" as adr WHERE adr."ContractId" = c."Id" ORDER BY adr."OrderNo") AuthorDocumentedRequest) AS AuthorDocumentedRequest, ' +
    '(SELECT json_agg(EconomicalCommitee) FROM (SELECT * FROM "Ordering"."EconomicalCommitee" as ec WHERE ec."ContractId" = c."Id" ORDER BY ec."OrderNo") EconomicalCommitee) AS EconomicalCommitee, ' +
    '(SELECT json_agg(SnippetPractical) FROM (SELECT * FROM "Ordering"."SnippetPractical" as sp WHERE sp."ContractId" = c."Id" ORDER BY sp."OrderNo") SnippetPractical) AS SnippetPractical ' +
    'FROM "Ordering"."Contract" as c '
}

function checkIfLoginUserIsTheGeneralManager(loginUserInfo) {
  return util.format(" %s='ΓΕΝΙΚΟΣ ΓΡΑΜΜΑΤΕΑΣ' OR %s='ΓΕΝΙΚΟΣ ΓΡΑΜΜΑΤΕΑΣ' ", helper.addQuotes(loginUserInfo.ou), helper.addQuotes(loginUserInfo.personalTitle));
}

function checkIfLoginUserIsTheMayor(loginUserInfo) {
  return util.format(" %s='ΔΗΜΑΡΧΟΣ' OR %s='ΔΗΜΑΡΧΟΣ' ", helper.addQuotes(loginUserInfo.ou), helper.addQuotes(loginUserInfo.personalTitle));
}

function checkIfLoginUserIsSupervisor(loginUserInfo) {
  return util.format(' %s IN (SELECT con."Supervisor" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ) ', helper.addQuotes(loginUserInfo.uid));
}

function checkIfLoginUserIsDirector(loginUserInfo) {
  return util.format(' %s IN (SELECT con."Director" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ) ', helper.addQuotes(loginUserInfo.uid));
}

function checkIfLoginUserBelongToSameDirectionAndDepartment(loginUserInfo) {
  return util.format(' (%s IN (SELECT con."Direction" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" )) AND  ' +
    '(%s IN (SELECT con."Department" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ))',
    helper.addQuotes(loginUserInfo.ou),
    helper.addQuotes(loginUserInfo.departmentNumber));
}

function query_searchcontracts(req) {
  var filter = req.body.filter;
  var loginUserInfo = req.body.data.user;

  var whereFilter = getWhere(loginUserInfo) + ' AND LOWER(c."Title") LIKE LOWER(\'%' + filter + '%\')' + ' OR LOWER(c."ConcessionaireName") LIKE LOWER(\'%' + filter + '%\') ' +
    'AND (c."OwnerId"=' + helper.addQuotes(loginUserInfo.uid) + ' OR c."AllUsers"=true) ';

  return util.format('%s %s %s %s', getSelectFromClauses(loginUserInfo), whereFilter, 'ORDER BY c."Start" DESC ', 'OFFSET 0 LIMIT 100')
}

function query_contractexists(req) {
  return util.format('SELECT * ' +
    'FROM "Ordering"."Contract" ' +
    'Where "Ordering"."Contract"."ProtocolNumber"=%s ', helper.addQuotes(req.body.ProtocolNumber))
}

function query_updatecontract(req) {
  var contractInfo = req.body.contractInfo;

  var sqlQuery = util.format('UPDATE "Ordering"."Contract" ' +
    'SET "ContractTypeId"=%s,"Title"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"KAE"=%s,"Actor"=%s,' +
    '"CodeDirection"=%s,"AwardNumber"=%s,"AwardDate"=%s,"AwardAda"=%s,"CpvCode"=%s,"CpvTitle"=%s,"AmountPure"=%s,"AmountFpa"=%s,"AmountTotal"=%s,' +
    '"Balance"=%s,"Start"=%s,"End"=%s,"NumberOfAccounts"=%s,"Direction"=%s,"Department"=%s,"DateModified"=%s,"ConcessionaireName"=%s,' +
    '"ConcessionaireAFM"=%s,"HasDownPayment"=%s,"FpaValue"=%s, "AllUsers"=%s,"LawArticle"=%s,"Discreet"=%s,"AccountPer"=%s ' +
    'WHERE "Id"=%s ' +
    'RETURNING * ',
    helper.addQuotes(contractInfo.ContractTypeId),
    helper.addQuotes(contractInfo.Title || ''),
    helper.addQuotes(contractInfo.ProtocolNumber),
    helper.addQuotes(contractInfo.ProtocolDate),
    helper.addQuotes(contractInfo.KAE),
    helper.addQuotes(contractInfo.Actor),
    helper.addQuotes(contractInfo.CodeDirection),
    helper.addQuotes(contractInfo.AwardNumber),
    helper.addQuotes(contractInfo.AwardDate),
    helper.addQuotes(contractInfo.AwardAda),
    helper.addQuotes(contractInfo.CpvCode || ''),
    helper.addQuotes(contractInfo.CpvTitle || ''),
    helper.addQuotes(contractInfo.AmountPure),
    helper.addQuotes(contractInfo.AmountFpa),
    helper.addQuotes(contractInfo.AmountTotal),
    helper.addQuotes(contractInfo.Balance),
    helper.addQuotes(contractInfo.Start),
    helper.addQuotes(contractInfo.End),
    helper.addQuotes(contractInfo.NumberOfAccounts),
    helper.addQuotes(contractInfo.Direction),
    helper.addQuotes(contractInfo.Department),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(contractInfo.ConcessionaireName || ''),
    helper.addQuotes(contractInfo.ConcessionaireAFM || ''),
    contractInfo.HasDownPayment,
    helper.addQuotes(contractInfo.FpaValue),
    contractInfo.AllUsers,
    helper.addQuotes(contractInfo.LawArticle || ''),
    helper.addQuotes(contractInfo.Discreet || ''),
    helper.addQuotes(contractInfo.AccountPer),
    contractInfo.ContractId);

  return sqlQuery;
}

function query_deletecontract(req) {
  return util.format('DELETE FROM "Ordering"."Contract" WHERE "Id"=%s RETURNING * ', req.body.Id);
}

module.exports = {
  query_getcontracts,
  query_getcontractbyid,
  query_getcontracttypes,
  query_searchcontracts,
  query_contractexists,
  query_insertcontract,
  query_insertcontractowner,
  query_updatecontract,
  query_deletecontract
}