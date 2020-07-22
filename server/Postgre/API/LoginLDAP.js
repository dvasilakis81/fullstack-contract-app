var ldap = require('ldapjs');
var jwt = require('jsonwebtoken');
var util = require('util');
var helper = require('../../HelperMethods/helpermethods')
var secretKey = process.env.API_SECRET || 'athens_2019';
const pool = require('../dbConfig').pool
const reservationsMethods = require('./Reservations/Methods')

var client = ldap.createClient({
  url: 'ldaps://10.1.24.17:636',
  tlsOptions: { rejectUnauthorized: false },
  bindDn: 'uid=prog.simvaseis,ou=app_accounts,dc=cityofathens,dc=gr',
  bindCredentials: 'VkLqQzYsNSE5v3x'
});

//const loginUsername = 'd.vasilakis';
//const loginPassword = 'DigidddtalMan82';

function login(request, response, next) {
  const username = request.query.u;
  const password = request.query.p;
  console.log('login');

  searchLoginUser(request, response, next, username, password);
}

function searchLoginUser(request, response, next, username, password) {
  var ret = false;
  var loginUser = [];
  var opts = {
    filter: '(objectClass=*)',
    filter: '(uid=' + username + ')',
    scope: 'sub',
    attributes: ['*']
  };

  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  client.search(queryOEY, opts, function (err, res) {
    if (err)
      console.log("Error in search " + err)
    else {
      res.on('searchEntry', function (entry) {
        console.log('entry: ' + JSON.stringify(entry.object));
        loginUser.push(entry.object);
        // (SELECT json_agg(UserReservations) FROM (SELECT * FROM "Ordering"."UserReservations" as ur WHERE ur."UserId" = u."Id" ORDER BY ur."Order" ASC) UserReservations) AS UserReservations ' +
        authenticateDN(request, response, next, entry.object, password);
      });
      res.on('searchReference', function (referral) {
        console.log('referral: ' + referral.uris.join());
      });
      res.on('error', function (err) {
        console.error('error: ' + err.message);
        response.send('error: ' + err.message)
      });
      res.on('end', function (result) {
        console.log('status: ' + result.status);
        if (loginUser && loginUser.length === 0)
          response.send('Λάθος όνομα χρήστη!');
      });
    }
  });

  return ret;
}

function authenticateDN(request, response, next, user, password) {

  /*bind use for authentication*/
  client.bind(user.dn, password, function (err) {
    if (err)
      response.send("Λάθος κωδικός!");
    else {
      var sqlQuery = util.format('SELECT * FROM "Ordering"."UserReservations" as ur WHERE ur."UserId"=%s ORDER BY ur."Order" ASC ', helper.addQuotes(user.uid));
      pool.query(sqlQuery, (error, results) => {
        if (error)
          next(error);
        else {

          if (user.departmentNumber) {
          } else {
            user.departmentNumber = 'Τμήμα Τεχνολογίας, Πληροφορικής και Επικοινωνιών';
          }

          searchForSupervisor(request, response, next, user);
          //searchForPeopleThatBelongsToTheSameDirection(request, response, next, user.ou);
        }
      })
    }
  });
}

function searchForSupervisor(request, response, next, user) {

  var opts = {
    filter: '(objectClass=*)',
    filter: '(&(ou=' + user.ou + ')(departmentNumber=' + user.departmentNumber + ')(|(personalTitle=ΠΡΟΙΣΤΑΜΕΝΟΣ)(personalTitle=ΠΡΟΙΣΤΑΜΕΝH)))',
    scope: 'sub',
    attributes: ['*']
  };

  var results = [];
  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  client.search(queryOEY, opts, function (err, res) {
    if (err)
      console.log("Error in search " + err);
    else {
      res.on('searchEntry', function (entry) {
        results.push(entry.object);
      });
      res.on('searchReference', function (referral) {
        console.log('referral: ' + referral.uris.join());
      });
      res.on('error', function (err) {
        console.error('error: ' + err.message);
        response.send('error: ' + err.message);
      });
      res.on('end', function (result) {
        console.log('status: ' + result.status);
        user.supervisor = results[0].uid;
        searchForDirector(request, response, next, user);
      });
    }
  });
}

function searchForDirector(req, response, next, user) {

  var opts = {
    filter: '(objectClass=*)',
    filter: '(&(ou=' + user.ou + ')(|(personalTitle=ΔΙΕΥΘΥΝΤΗΣ)(personalTitle=ΔΙΕΥΘΥΝΤΡΙΑ)))',
    scope: 'sub',
    attributes: ['*']
  };

  var results = [];
  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  client.search(queryOEY, opts, function (err, res) {
    if (err)
      console.log("Error in search " + err);
    else {
      res.on('searchEntry', function (entry) {
        results.push(entry.object);
      });
      res.on('searchReference', function (referral) {
        console.log('referral: ' + referral.uris.join());
      });
      res.on('error', function (err) {
        console.error('error: ' + err.message);
        res.send('error: ' + err.message);
      });
      res.on('end', async function (result) {

        //setup user reservations
        const userReservations  = await reservationsMethods.getUserReservations(req, res, next, user.uid);
        if (userReservations && userReservations.length > 0)
          user.reservations = userReservations;
        else {
          const reservations = await reservationsMethods.getReservations(req, res, next);
          await reservationsMethods.query_insert(reservations, user.uid);
          user.reservations = await reservationsMethods.getUserReservations(req, res, next, user.uid);
        }

        user.director = results[0].uid;

        let token = jwt.sign({ username: user.uid }, secretKey, { expiresIn: ('2h') });
        response.status(200).json({
          success: true,
          id: user.uid,
          user: user,
          token: token,
          expiresAt: helper.getExpiresAt(token, jwt, secretKey)
        });
      });
    }
  });
}

function searchForPeopleThatBelongsToTheSameDirection(request, response, next, direction) {
  var opts = {
    filter: '(objectClass=*)',
    //filter: '(&(uid=2)(sn=John))',// and search
    //filter: '(|(uid=2)(sn=John)(cn=Smith))', // or search
    //filter: '(uid=d.vasilakis)',
    filter: '(ou=' + direction + ')',
    scope: 'sub',
    //attributes: ['sn']
    attributes: ['*']
  };
  var results = [];
  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  // var queryGroups = 'cn=delme,ou=groups,ou=OEY,dc=cityofathens,dc=gr';

  client.search(queryOEY, opts, function (err, res) {
    if (err)
      console.log("Error in search " + err);
    else {
      res.on('searchEntry', function (entry) {
        results.push(entry.object);
      });
      res.on('searchReference', function (referral) {
        console.log('referral: ' + referral.uris.join());
      });
      res.on('error', function (err) {
        console.error('error: ' + err.message);
        response.send('error: ' + err.message);
      });
      res.on('end', function (result) {
        console.log('status: ' + result.status);
        response.send(results);
      });
    }
  });
}

module.exports = {
  login
}