var ldap = require('ldapjs');
var jwt = require('jsonwebtoken');
var util = require('util');
var helper = require('../../HelperMethods/helpermethods')
var secretKey = process.env.API_SECRET || 'athens_2019';
const pool = require('../dbConfig').pool
const reservationsMethods = require('./Reservations/User/Methods')

var client = ldap.createClient({
  url: 'ldaps://10.1.24.17:636',
  tlsOptions: { rejectUnauthorized: false },
  bindDn: 'uid=prog.simvaseis,ou=app_accounts,dc=cityofathens,dc=gr',
  bindCredentials: 'VkLqQzYsNSE5v3x'
});

function login(request, response, next) {
  const username = request.query.u;
  const password = request.query.p;

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
        loginUser.push(entry.object);
        authenticateDN(request, response, next, entry.object, password);
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

          if (user.uid === 'd.vasilakis' || user.uid === 's.partasidis') {
            if (user.departmentNumber) {
            } else {
              user.departmentNumber = 'Τμήμα Τεχνολογίας, Πληροφορικής και Επικοινωνιών';
            }
          }
          searchForSupervisor(request, response, next, user);
          //searchForDirectionInfo(request, response, next, user);
          //searchForPeopleThatBelongsToTheSameDirection(request, response, next, user.ou);
        }
      })
    }
  });
}

function searchForDirectionInfo(request, response, next, user) {

  var opts = {
    // filter: '(ou=' + user.ou + ')',
    filter: "(objectclass=organizationalUnit)",
    // filter: 'ou=Δ.ΓΕΝΙΚΟΣ ΓΡΑΜΜΑΤΕΑΣ,ou=ΟΕΥ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr',
    scope: 'sub',
    attributes: ['*']
  };

  var results = [];
  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  //var queryOEY = 'ou=ΟΕΥ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr';

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
        if (results && results.length > 0)
        {
          user.supervisor = results[0].uid;
          user.supervisorName = results[0].uid;
        }
        searchForDirector(request, response, next, user);
      });
    }
  });
}

function searchForSupervisor(request, response, next, user) {

  var opts = {
    // filter: '(objectClass=*)',
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
        if (results && results.length > 0){
          user.supervisor = results[0].uid;
          user.supervisorName = results[0].cn;
        }
        searchForDirector(request, response, next, user);
      });
    }
  });
}

function searchForDirector(req, res, next, user) {

  var opts = {
    filter: '(objectClass=*)',
    filter: '(&(ou=' + user.ou + ')(|(personalTitle=ΔΙΕΥΘΥΝΤΗΣ)(personalTitle=ΔΙΕΥΘΥΝΤΡΙΑ)))',
    scope: 'sub',
    attributes: ['*']
  };

  var results = [];
  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  client.search(queryOEY, opts, function (err, searchresult) {
    if (err)
      console.log("Error in search " + err);
    else {
      searchresult.on('searchEntry', function (entry) {
        results.push(entry.object);
      });
      searchresult.on('searchReference', function (referral) {
        console.log('referral: ' + referral.uris.join());
      });
      searchresult.on('error', function (err) {
        console.error('error: ' + err.message);
        searchresult.send('error: ' + err.message);
      });
      searchresult.on('end', async function (result) {

        //setup user reservations
        const userReservations = await reservationsMethods.getUserReservations(req, searchresult, next, user.uid);
        if (userReservations && userReservations.length > 0)
          user.reservations = userReservations;
        else {
          const reservations = await reservationsMethods.getReservations(req, searchresult, next);
          await reservationsMethods.initializeUserReservations(reservations, user.uid);
          user.reservations = await reservationsMethods.getUserReservations(req, searchresult, next, user.uid);
        }

        if (results && results.length > 0){
          user.director = results[0].uid;
          user.directorName = results[0].cn;          
        }

        searchForPeopleThatBelongsToTheSameDirection(req, res, next, user);
      });
    }
  });
}

function searchForPeopleThatBelongsToTheSameDirection(re, res, next, user) {
  var opts = {
    filter: '(objectClass=*)',
    //filter: '(&(uid=2)(sn=John))',// and search
    //filter: '(|(uid=2)(sn=John)(cn=Smith))', // or search
    //filter: '(uid=d.vasilakis)',
    filter: '(departmentNumber=' + user.departmentNumber + ')',
    scope: 'sub',
    //attributes: ['sn']
    attributes: ['*']
  };
  var results = [];
  var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  // var queryGroups = 'cn=delme,ou=groups,ou=OEY,dc=cityofathens,dc=gr';

  client.search(queryOEY, opts, function (err, searchresult) {
    if (err)
      console.log("Error in search " + err);
    else {
      searchresult.on('searchEntry', function (entry) {
        results.push(entry.object);
      });
      searchresult.on('searchReference', function (referral) {
        console.log('referral: ' + referral.uris.join());
      });
      searchresult.on('error', function (err) {        
        searchresult.send('error: ' + err.message);
      });
      searchresult.on('end', function (result) {
        
        user.users = results;
        let token = jwt.sign({ username: user.uid }, secretKey, { expiresIn: ('2h') });
        res.status(200).json({
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

function checkToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer '))
      token = token.slice(7, token.length);

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(200).json({
          tokenIsValid: false,
          message: 'Token is not valid',
          error: err.message,
          expiresAt: err.expiredAt
        });
      } else {
        //const d = new Date(0);
        //d.setUTCSeconds(decoded.exp);
        next();
      }
    });
  } else {
    console.log("CHECKTOKEN\nprotocol:" + req.protocol + "\nhostname: " + req.hostname + "\npath: " + req.path + "\noriginalUrl: " + req.originalUrl);
    return res.status(200).json({
      tokenIsValid: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  login,
  checkToken
}