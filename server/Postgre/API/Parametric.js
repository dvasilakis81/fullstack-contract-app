const helper = require('../../HelperMethods/helpermethods')
const pool = require('../dbConfig').pool
const util = require('util')

const getDirections = (request, response, next) => {

  var sqlQuery = 'SELECT *, ' +
    '(SELECT json_agg(Department) ' +
    'FROM (SELECT * ' +
    'FROM "Ordering"."Department" as dep ' +    
    'WHERE dir."DirectionId" = dep."DirectionId" ' + 
    'ORDER BY dep."DepartmentName") Department) AS Department ' +
    'FROM "Ordering"."Direction" as dir ' + 
    'ORDER BY dir."DirectionName" ';

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get directions: \n" + error.message);
    }
    else {
      helper.consoleLog(new Date().toLocaleString() + " Directions requested");
      response.status(200).json(results.rows);
    }
  })
}

const getDirection = (request, response, next, id) => {

  var sqlQuery = 'SELECT *, ' +
    '(SELECT json_agg(Department) ' +
    'FROM (SELECT * ' +
    'FROM "Ordering"."Department" as dep ' +
    'WHERE dir."DirectionId" = dep."DirectionId") Department) AS Department ' +
    'FROM "Ordering"."Direction" as dir ' +
    'WHERE dir."DirectionId"= ' + id;

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog(new Date().toLocaleString() + "Failed to get direction" + error.message);
    }
    else {
      response.status(200).json(results.rows[0]);
    }
  })
}

const getAgencies = (request, response, next) => {
  pool.query('SELECT * FROM "Ordering"."Agencies" as ag ORDER BY ag."Name"', (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog(new Date().toLocaleString() + ": Agencies requested");
      response.status(200).json(results.rows)
    }
  })
}

const getSignatories = (request, response, next) => {
  pool.query('SELECT * FROM "Ordering"."Signatory"', (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog(new Date().toLocaleString() + ": Signatories requested");
      response.status(200).json(results.rows)
    }
  })
}

const getSignatoryTypes = (request, response, next) => {
  pool.query('SELECT * FROM "Ordering"."SignatoryType"', (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog(new Date().toLocaleString() + ": Signatory requested");
      response.status(200).json(results.rows)
    }
  })
}

const getErrorMessages = (request, response, next) => {
  pool.query('SELECT * FROM "Ordering"."LogError"', (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog(new Date().toLocaleString() + ": Errors requested");
      response.status(200).json(results.rows)
    }
  })
}

const getUsers = (request, response, next) => {
  var sqlQuery = 'SELECT *, ' +
    '(SELECT json_agg(UserRoles) FROM (SELECT * FROM "Ordering"."UserRoles" as b WHERE b."Id" = u."Role") UserRoles) AS UserRoles ' +
    'FROM "Ordering"."User" as u'

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog(new Date().toLocaleString() + ": Users requested");
      response.status(200).json(results.rows)
    }
  })
}

const getUserRoles = (request, response, next) => {
  var sqlQuery = 'SELECT * FROM "Ordering"."UserRoles"'

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog(new Date().toLocaleString() + ": User Roles requested");
      response.status(200).json(results.rows)
    }
  })
}

const createDirection = (req, res, next) => {
  var ret = ''

  const name = req.body.DirectionName;
  const supervisor = req.body.DirectionSupervisor;
  const telephone = req.body.DirectionTelephone;
  const email = req.body.DirectionEmail;
  const address = req.body.DirectionAddress;
  const postcode = req.body.DirectionPostCode;
  const city = req.body.DirectionCity;

  var sqlQuery = util.format('INSERT INTO "Ordering"."Direction"("DirectionName", "DirectionSupervisor", "DirectionTelephone", "DirectionEmail", "DirectionAddress", "DirectionPostCode", "DirectionCity") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(name),
    helper.addQuotes(supervisor),
    helper.addQuotes(telephone),
    helper.addQuotes(email),
    helper.addQuotes(address),
    helper.addQuotes(postcode),
    helper.addQuotes(city))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      getDirection(req, res, next, (results.rows[0].DirectionId));
    //res.status(200).json(results.rows[0]);    
  })

  return ret;
}

const updateDirection = (req, res, next) => {
  var sqlQuery = '';

  const id = req.body.DirectionId;
  const name = req.body.DirectionName;
  const supervisor = req.body.DirectionSupervisor;
  const telephone = req.body.DirectionTelephone;
  const email = req.body.DirectionEmail;
  const address = req.body.DirectionAddress;
  const postcode = req.body.DirectionPostCode;
  const city = req.body.DirectionCity;

  sqlQuery = util.format('UPDATE "Ordering"."Direction" ' +
    'SET "DirectionName"=%s,"DirectionSupervisor"=%s,"DirectionTelephone"=%s,"DirectionEmail"=%s,"DirectionAddress"=%s,"DirectionPostCode"=%s,"DirectionCity"=%s ' +
    'WHERE "DirectionId"=%s ' +
    'RETURNING * ',
    helper.addQuotes(name),
    helper.addQuotes(supervisor),
    helper.addQuotes(telephone),
    helper.addQuotes(email),
    helper.addQuotes(address),
    helper.addQuotes(postcode),
    helper.addQuotes(city),
    id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteDirection = (req, res, next) => {
  var sqlQuery = '';
  var id = req.body.DirectionId;
  sqlQuery = util.format('DELETE FROM "Ordering"."Direction" WHERE "DirectionId"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const createDepartment = (req, res, next) => {
  var ret = ''

  const directionId = req.body.DirectionId;
  const departmentName = req.body.DepartmentName;
  const departmentSupervisor = req.body.DepartmentSupervisor;
  const departmentTelephone = req.body.DepartmentTelephone;
  const departmentEmail = req.body.DepartmentEmail;

  var sqlQuery = util.format('INSERT INTO "Ordering"."Department"("DirectionId","DepartmentName","DepartmentSupervisor","DepartmentTelephone","DepartmentEmail") ' +
    'VALUES(%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(directionId),
    helper.addQuotes(departmentName),
    helper.addQuotes(departmentSupervisor),
    helper.addQuotes(departmentTelephone),
    helper.addQuotes(departmentEmail))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0]);
  })

  return ret;
}

const updateDepartment = (req, res, next) => {
  var sqlQuery = '';
  var departmentId = req.body.DepartmentId;
  const directionId = req.body.DirectionId;
  const departmentName = req.body.DepartmentName;
  const departmentSupervisor = req.body.DepartmentSupervisor;
  const departmentTelephone = req.body.DepartmentTelephone;
  const departmentEmail = req.body.DepartmentEmail;

  sqlQuery = util.format('UPDATE "Ordering"."Department" ' +
    'SET "DirectionId"=%s,"DepartmentName"=%s,"DepartmentSupervisor"=%s,"DepartmentTelephone"=%s,"DepartmentEmail"=%s ' +
    'WHERE "DepartmentId"=%s ' +
    'RETURNING * ',
    helper.addQuotes(directionId),
    helper.addQuotes(departmentName),
    helper.addQuotes(departmentSupervisor),
    helper.addQuotes(departmentTelephone),
    helper.addQuotes(departmentEmail),
    departmentId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteDepartment = (req, res, next) => {
  var id = req.body.DepartmentId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."Department" WHERE "DepartmentId"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const createAgency = (req, res, next) => {
  var ret = ''

  const name = req.body.Name;
  var sqlQuery = util.format('INSERT INTO "Ordering"."Agencies"("Name") VALUES(%s) RETURNING * ', helper.addQuotes(name))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0]);
  })

  return ret;
}

const updateAgency = (req, res, next) => {
  var sqlQuery = '';
  var id = req.body.Id;
  var name = req.body.Name;

  sqlQuery = util.format('UPDATE "Ordering"."Agencies" ' +
    'SET "Name"=%s' +
    'WHERE "Id"=%s ' +
    'RETURNING * ',
    helper.addQuotes(name),
    id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteAgency = (req, res, next) => {

  var id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."Agencies" WHERE "Id"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const createSignatory = (req, res, next) => {
  var ret = ''

  const Name = req.body.Name;

  var sqlQuery = util.format('INSERT INTO "Ordering"."Signatory"("Name") VALUES(%s) RETURNING * ', helper.addQuotes(Name))
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0]);
  })

  return ret;
}

const updateSignatory = (req, res, next) => {
  var sqlQuery = '';
  var Id = req.body.Id;
  const Name = req.body.Name;

  sqlQuery = util.format('UPDATE "Ordering"."Signatory" ' +
    'SET "Name"=%s ' +
    'WHERE "Id"=%s ' +
    'RETURNING * ',
    helper.addQuotes(Name),
    Id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteSignatory = (req, res, next) => {

  var id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."Signatory" WHERE "Id"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const createSignatoryType = (req, res, next) => {
  var ret = ''

  const Name = req.body.Name;
  var sqlQuery = util.format('INSERT INTO "Ordering"."SignatoryType"("Name") VALUES(%s) RETURNING * ', helper.addQuotes(Name))
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0]);
  })

  return ret;
}

const updateSignatoryType = (req, res, next) => {
  var sqlQuery = '';
  var Id = req.body.Id;
  const Name = req.body.Name;

  sqlQuery = util.format('UPDATE "Ordering"."SignatoryType" ' +
    'SET "Name"=%s ' +
    'WHERE "Id"=%s ' +
    'RETURNING * ',
    helper.addQuotes(Name),
    Id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteSignatoryType = (req, res, next) => {

  var id = req.body.Id;

  var sqlQuery = util.format('DELETE FROM "Ordering"."SignatoryType" WHERE "Id"=%s RETURNING * ', id);
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteErrorMessage = (req, res, next) => {

  var id = req.body.Id;

  var sqlQuery = util.format('DELETE FROM "Ordering"."LogError" WHERE "Id"=%s RETURNING * ', id);
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
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

const createContractType = (req, res, next) => {
  var ret = ''

  const Name = req.body.ContractTypeName;
  var sqlQuery = util.format('INSERT INTO "Ordering"."ContractType"("ContractTypeName") VALUES(%s) RETURNING * ', helper.addQuotes(Name))
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0]);
  })

  return ret;
}

const updateContractType = (req, res, next) => {
  var sqlQuery = '';
  var Id = req.body.ContractTypeId;
  const Name = req.body.ContractTypeName;

  sqlQuery = util.format('UPDATE "Ordering"."ContractType" ' +
    'SET "ContractTypeName"=%s ' +
    'WHERE "ContractTypeId"=%s ' +
    'RETURNING * ',
    helper.addQuotes(Name),
    Id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteContractType = (req, res, next) => {

  var id = req.body.ContractTypeId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."ContractType" WHERE "ContractTypeId"=%s RETURNING * ', id);
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

module.exports = {
  getUsers,
  getUserRoles,
  getDirections,  
  createDirection,
  updateDirection,
  deleteDirection,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAgencies,
  createAgency,
  updateAgency,
  deleteAgency,  
  getSignatories,
  createSignatory,
  updateSignatory,
  deleteSignatory,
  getSignatoryTypes,
  getErrorMessages,
  createSignatoryType,
  updateSignatoryType,
  deleteSignatoryType,
  getContractTypes,
  deleteErrorMessage,
  createContractType,
  updateContractType,
  deleteContractType
}