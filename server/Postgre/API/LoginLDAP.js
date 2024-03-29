var ldap = require('ldapjs');
var jwt = require('jsonwebtoken');
var util = require('util');
var helper = require('../../HelperMethods/helpermethods')
var secretKey = process.env.API_SECRET || 'athens_2019';
const pool = require('../dbConfig').pool
const reservationsMethods = require('./Reservations/User/Methods')
var fs = require('fs');

var client = ldap.createClient({
  url: 'ldaps://10.1.24.17:636',
  tlsOptions: { rejectUnauthorized: false },
  bindDn: 'uid=prog.simvaseis,ou=app_accounts,dc=cityofathens,dc=gr',
  bindCredentials: 'VkLqQzYsNSE5v3x'
});

async function setupDummyUser(req, res, next) {
  var user = {
    uid: 'p.skafidas',
    sn: 'ΣΚΑΦΙΔΑΣ',
    cn: 'ΠΑΝΑΓΙΩΤΗΣ ΣΚΑΦΙΔΑΣ',
    givenName: 'ΠΑΝΑΓΙΩΤΗΣ',
    director: 'g.papazogloy',
    directorName: 'ΓΡΑΜΜΑΤΙΚΗ ΠΑΠΑΖΟΓΛΟΥ',
    supervisor: 'o.vasoglou',
    supervisorName: 'ΟΛΓΑ ΒΑΣΟΓΛΟΥ',
    departmentNumber: 'Τμήμα Τεχνολογίας, Πληροφορικής και Επικοινωνιών',
    ou: 'Δ/ΝΣΗ ΣΤΡΑΤΗΓ. ΣΧΕΔ., ΑΝΘΕΚΤΙΚΟΤΗΤΑΣ, ΚΑΙΝΟΤΟΜΙΑΣ & ΤΕΚΜΗΡ.'
  }

  const userReservations = await reservationsMethods.getUserReservations(user.uid, next);
  if (userReservations && userReservations.length > 0)
    user.reservations = userReservations;
  else {
    const reservations = await reservationsMethods.getReservations(req, next);
    await reservationsMethods.initializeUserReservations(reservations, user.uid, next);
    user.reservations = await reservationsMethods.getUserReservations(user.uid, next);
  }

  searchForPeopleThatBelongsToTheSameDirection(req, res, next, user);
}

async function login(request, response, next) {
  //const username = request.query.u;
  //const password = request.query.p;
  const username = request.body.Username;
  const password = request.body.Password;

  //searchForPeople(request, response, next);
  if (username === 'p.skafidas' && password === 'demo')
    await setupDummyUser(request, response, next);
  else
    searchLoginUser(request, response, next, username, password);
}

function getUserInfo(request, response, next) {

  const username = request.body.username;
  var ret = false;
  var userInfo = {};
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
        //userInfo.push(entry.object);
        userInfo.uid = entry.object.uid;
        userInfo.organization = entry.object.o;
        userInfo.givenName = entry.object.givenName;
        userInfo.surName = entry.object.sn;
        userInfo.email = entry.object.mail;
        userInfo.direction = entry.object.ou;
        userInfo.department = entry.object.departmentNumber;
        userInfo.title = entry.object.personalTitle;
        userInfo.manager = entry.object.manager.substring(4, entry.object.manager.indexOf(","));
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
        if (userInfo && userInfo.length === 0)
          response.send('Λάθος όνομα χρήστη!');
        else
          response.send(userInfo);
      });
    }
  });
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

          if (user.uid === 'd.vasilakis') {
            if (user.departmentNumber) {
            } else {
              user.departmentNumber = 'Τμήμα Τεχνολογίας, Πληροφορικής και Επικοινωνιών';
              //user.uid = 'demo';
              //user.departmentNumber = 'Dummy';
            }
          }

          searchForSupervisor(request, response, next, user);
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
        if (results && results.length > 0) {
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
        if (results && results.length > 0) {
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
        const userReservations = await reservationsMethods.getUserReservations(user.uid, next);
        if (userReservations && userReservations.length > 0)
          user.reservations = userReservations;
        else {
          const reservations = await reservationsMethods.getReservations(req, next);
          await reservationsMethods.initializeUserReservations(reservations, user.uid, next);
          user.reservations = await reservationsMethods.getUserReservations(user.uid, next);
        }

        if (results && results.length > 0) {
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
    //filter: '(uid=a.stefos)',
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
        //user.ou = 'ΓΕΝΙΚΟΣ ΓΡΑΜΜΑΤΕΑΣ';
        let token = jwt.sign({ username: user.uid }, secretKey, { expiresIn: ('8h') });
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

function searchForPeople(req, res, next) {
  var opts = {
    //filter: '(objectClass=organizationalUnit)',
    //filter: '(objectClass=person)',
    filter: '(&(objectClass=person)(|(ou=ΔΗΜΑΡΧΟΣ)(ou=Αντιδήμαρχος)(ou=Εντεταλμένος Σύμβουλος)))',
    //filter: 'uid=v.priovolos',
    scope: 'sub',
    //attributes: ['*'],
    attributes: ['uid', 'givenName', 'sn', 'ou', 'departmentNumber', 'mail'],
    //filter: '(|(personalTitle=ΔΙΕΥΘΥΝΤΗΣ)(personalTitle=ΔΙΕΥΘΥΝΤΡΙΑ))',
    // filter: '(objectClass=*)',
    // //filter: '(&(uid=2)(sn=John))',// and search
    // //filter: '(|(uid=2)(sn=John)(cn=Smith))', // or search
    //filter: '(uid=g.papazogloy)',
    //filter: '(uid=a.tsiatsiamis)',
    //filter: '(uid=k.gkagkaki)',
    //filter: '(uid=g.moraitis)',
    //filter: '(uid=k.alexiou)',
    //filter: '(objectClass=person))',\    
    
    // scope: 'sub',
    // //attributes: ['sn']
    // attributes: ['*']
  };
  var results = [];
  //var query = dn;
  //var query = 'ou=ΟΕΥ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr';
  var query = 'ou=OEY,dc=cityofathens,dc=gr';
  //query = 'ou=ΔΗΜΟΤΙΚΟΙ ΣΥΜΒΟΥΛΟΙ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr';
  //var query = 'ou=ΑΝΕΝΕΡΓΟΙ ΥΠΑΛΛΗΛΟΙ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr'
  //var query = 'ou=1.ΑΥΤΟΤΕΛΕΣ ΤΜΗΜΑ ΔΙΟΙΚΗΤΙΚΗΣ ΥΠΟΣΤΗΡΙΞΗΣ ΔΗΜΑΡΧΟΥ,ou=Α.ΔΗΜΑΡΧΟΣ,ou=ΟΕΥ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr'
  // var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  // var queryGroups = 'cn=delme,ou=groups,ou=OEY,dc=cityofathens,dc=gr';

  client.search(query, opts, function (err, searchresult) {
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
        int = 0;
        // var dn;
        // var dns = [];
        // for(i=0;i<results.length;i++){
        //   if (!dns.includes(results[i]))
        //     dns.push(results[i]);
        // }
        // var dir = './ldap_users';
        // if (!fs.existsSync(dir))
        //   fs.mkdirSync(dir);

        // fs.writeFile(dn + '.json', 'Learn Node FS module', function (err) {
        //   if (err) throw err;
        //   console.log('File is created successfully.');
        // });
        res.status(200).json({ users: results });

        // let token = jwt.sign({ username: user.uid }, secretKey, { expiresIn: ('8h') });
        // res.status(200).json({
        //   success: true,
        //   id: user.uid,
        //   user: user,
        //   token: token,
        //   expiresAt: helper.getExpiresAt(token, jwt, secretKey)
        // });
      });
    }
  });
}

function searchForOrganizationalUnit(req, res, next) {
  var opts = {
    filter: '(objectClass=organizationalUnit)',
    //filter: '(objectClass=person)',
    //filter: 'uid=v.priovolos',
    scope: 'sub',
    attributes: ['dn'],
    //filter: '(|(personalTitle=ΔΙΕΥΘΥΝΤΗΣ)(personalTitle=ΔΙΕΥΘΥΝΤΡΙΑ))',
    // filter: '(objectClass=*)',
    // //filter: '(&(uid=2)(sn=John))',// and search
    // //filter: '(|(uid=2)(sn=John)(cn=Smith))', // or search
    //filter: '(uid=g.papazogloy)',
    //filter: '(uid=a.tsiatsiamis)',
    //filter: '(uid=m.agiostratiti)',
    //filter: '(uid=g.moraitis)',
    //filter: '(objectClass=person))',
    // scope: 'sub',
    // //attributes: ['sn']
    // attributes: ['*']
  };
  var results = [];
  var query = 'ou=ΟΕΥ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr';
  //var query = 'ou=ΑΝΕΝΕΡΓΟΙ ΥΠΑΛΛΗΛΟΙ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr'
  //var query = 'ou=1.ΑΥΤΟΤΕΛΕΣ ΤΜΗΜΑ ΔΙΟΙΚΗΤΙΚΗΣ ΥΠΟΣΤΗΡΙΞΗΣ ΔΗΜΑΡΧΟΥ,ou=Α.ΔΗΜΑΡΧΟΣ,ou=ΟΕΥ,ou=ΠΡΟΣΩΠΑ,ou=OEY,dc=cityofathens,dc=gr'

  // var queryOEY = 'ou=OEY,dc=cityofathens,dc=gr';
  // var queryGroups = 'cn=delme,ou=groups,ou=OEY,dc=cityofathens,dc=gr';
  client.search(query, opts, function (err, searchresult) {
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
        int = 0;
        var dn;
        var dns = [];
        for (i = 0; i < results.length; i++) {
          if (!dns.includes(results[i]))
            searchForPeople(req, res, next, results[i]);
          //dns.push(results[i]);
        }

        //res.status(200).json({ users: results });

        // let token = jwt.sign({ username: user.uid }, secretKey, { expiresIn: ('8h') });
        // res.status(200).json({
        //   success: true,
        //   id: user.uid,
        //   user: user,
        //   token: token,
        //   expiresAt: helper.getExpiresAt(token, jwt, secretKey)
        // });
      });
    }
  });
}

function checkToken(req, res, next) {

  helper.consoleLog(' checkToken -- url: ' + req.url);
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

function getLogin(req, res, next) {
  return res.status(200).json({ Message: 'OK' });
};

module.exports = {
  login,
  getLogin,
  checkToken,
  searchForPeople,
  searchForOrganizationalUnit,
  getUserInfo
}