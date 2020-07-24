const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insertcontract(req) {
  return util.format('INSERT INTO "Ordering"."Contract"("ContractTypeId", "Title",  "ProtocolNumber",  "ProtocolDate",  "KAE",  "Actor", ' +
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
    helper.addQuotes(req.body.LawArticle));
}

function query_insertcontractowner(req, contractId) {
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

  return sqlQuery;
}

function query_getcontracts(req) {

  var loginUserInfo = req.body.loginUserInfo;
  var offset = parseInt(req.body.offset);
  var limit = parseInt(req.body.limit);

  var where = util.format('WHERE c."OwnerId"=%s OR %s OR %s',
    helper.addQuotes(loginUserInfo.uid),
    checkIfLoginUserIsSupervisor(loginUserInfo.uid),
    checkIfLoginUserIsDirector(loginUserInfo.uid)
  );

  return util.format('%s %s %s OFFSET %s LIMIT %s', getSelectFromClauses(loginUserInfo.uid), where, 'ORDER BY c."Start" DESC ', offset, limit);

}

function query_getcontractbyid(req, contractId) {
  var cid = contractId ? contractId : req.body.contractId;
  var loginUserId = req.body.loginUserId;
  return util.format('%s %s', getSelectFromClauses(loginUserId), util.format('WHERE c."Id"=%s', cid))
}

function query_getcontracttypes() {
  return util.format('SELECT * FROM "Ordering"."ContractType"')
}

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

function checkIfLoginUserIsSupervisor(loginUserId) {
  return util.format(' %s IN (SELECT con."Supervisor" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ) ', helper.addQuotes(loginUserId));
}

function checkIfLoginUserIsDirector(loginUserId) {
  return util.format(' %s IN (SELECT con."Director" FROM "Ordering"."ContractOwner" as con WHERE con."ContractId"=c."Id" ) ', helper.addQuotes(loginUserId));
}


function query_searchcontracts(req) {
  var filter = req.query.filter;
  var loginUserId = parseInt(req.query.loginuserid);
  var where = 'WHERE ((LOWER(c."Title") LIKE LOWER(\'%' + filter + '%\')' + ' OR LOWER(c."ConcessionaireName") LIKE LOWER(\'%' + filter + '%\')) ' +
    'AND (c."OwnerId"=' + loginUserId + ' OR c."AllUsers"=true OR ' + loginUserId + ' IN (SELECT cus."UserId" FROM "Ordering"."ContractUsers" as cus WHERE cus."ContractId"=c."Id"))) ';

  return util.format('%s %s %s %s', getSelectFromClauses(loginUserId), where, gerOrderBy(), 'OFFSET 0 LIMIT 100')
}

function query_contractexists(req) {
  return util.format('SELECT * ' +
    'FROM "Ordering"."Contract" ' +
    'Where "Ordering"."Contract"."ProtocolNumber"=%s ', helper.addQuotes(req.body.ProtocolNumber))
}

function query_updatecontract(req, res, next) {
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