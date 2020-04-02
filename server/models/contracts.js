const db = require('../database');

class Contracts {
  static getContracts(callback) {

    var loginUserId = parseInt(request.query.loginuserid)
    var offset = parseInt(request.query.offset)
    var limit = parseInt(request.query.limit)

    var queryTotal = util.format('(SELECT COUNT(*) AS "Total" FROM "Ordering"."Contract" as c ' +
      'WHERE (c."OwnerId"=%s OR c."AllUsers"=true OR (%s IN (SELECT cus."UserId" FROM "Ordering"."ContractUsers" as cus WHERE cus."ContractId"=c."Id")))), ',
      loginUserId, loginUserId);

    var sqlQuery = util.format('SELECT *, ' +
      queryTotal +
      '(SELECT json_agg(Account) FROM (SELECT acct."Number",acct."Start",acct."End",acct."AmountPure", acct."AmountFpa", acct."AmountTotal" FROM "Ordering"."Account" as acct WHERE c."Id" = acct."ContractId" ORDER BY acct."Number") Account) AS CreatedAccounts, ' +
      '(SELECT json_agg(ContractType) FROM (SELECT * FROM "Ordering"."ContractType" as ct WHERE c."ContractTypeId" = ct."ContractTypeId") ContractType) AS ContractType, ' +
      '(SELECT json_agg(Direction) FROM (SELECT * FROM "Ordering"."Direction" as dir WHERE c."DirectionId" = dir."DirectionId") Direction) AS Direction, ' +
      '(SELECT json_agg(Department) FROM (SELECT * FROM "Ordering"."Department" as dep WHERE c."DepartmentId" = dep."DepartmentId") Department) AS Department, ' +
      '(SELECT json_agg(ContractUsers) FROM (SELECT * FROM "Ordering"."ContractUsers" as cus WHERE c."Id" = cus."ContractId") ContractUsers) AS ContractUsers, ' +
      '(SELECT json_agg(DecisionBoard) FROM (SELECT * FROM "Ordering"."DecisionBoard" as dp WHERE dp."ContractId" = c."Id") DecisionBoard) AS DecisionBoard, ' +
      '(SELECT json_agg(DecisionCoordinatorDecentrilizedAdministration) FROM (SELECT * FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" as dp WHERE dp."ContractId" = c."Id") DecisionCoordinatorDecentrilizedAdministration) AS DecisionCoordinatorDecentrilizedAdministration, ' +
      '(SELECT json_agg(CourtOfAuditors) FROM (SELECT * FROM "Ordering"."CourtOfAuditors" as dp WHERE dp."ContractId" = c."Id") CourtOfAuditors) AS CourtOfAuditors, ' +
      '(SELECT json_agg(Owner) FROM (SELECT * FROM "Ordering"."User" as usr WHERE c."OwnerId" = usr."Id") Owner) AS Owner ' +
      'FROM "Ordering"."Contract" as c ' +
      'WHERE (c."OwnerId"=%s ' +
      'OR c."AllUsers"=true ' +
      'OR %s IN (SELECT cus."UserId" FROM "Ordering"."ContractUsers" as cus WHERE cus."ContractId"=c."Id")) ' +
      'ORDER BY c."DateCreated" DESC ' +
      'OFFSET %s LIMIT %s', loginUserId, loginUserId, offset, limit)

    db.query(sqlQuery, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


  static insert(city, callback) {
    db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Contracts;