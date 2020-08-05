/*' -> &apos;
" -> &quot;
> -> &gt;
< -> &lt;
& -> &amp;*/

function fixTextForRawXml(text) {
  var ret = ''
  ret = text.replace(/&/g, '&amp;').replace(/'/g, '&apos').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/</g, '&lt;')
  return ret;
}

function addQuotes(value) {
  var ret = null;

  if (value)
    ret = '\''.concat(fixQuotes(value)).concat('\'');

  return ret;
}

function fixQuotes(value) {
  return value.toString().replace(/'/g, "''");
}

function consoleLog(value) {
  var ret = null;

  if (value)
    console.log(new Date().toLocaleString() + ' ' + value);

  return ret;
}

function getWord(number) {
  var ret = null;

  if (number === '1')
    ret = 'Ένα'
  else if (number === '2')
    ret = 'Δύο'
  else if (number === '3')
    ret = 'Τρία'
  else if (number === '4')
    ret = 'Τέσσερα'
  else if (number === '5')
    ret = 'Πέντε'
  else if (number === '6')
    ret = 'Έξι'
  else if (number === '7')
    ret = 'Εφτά'
  else if (number === '8')
    ret = 'Οκτώ'
  else if (number === '9')
    ret = 'Εννιά'
  else if (number === '10')
    ret = 'Δέκα'
  else if (number === '11')
    ret = 'Έντεκα'
  else if (number === '12')
    ret = 'Δώδεκα'
  else if (number === '13')
    ret = 'Δεκατρία'
  else if (number === '14')
    ret = 'Δεκατέσσερα'
  else if (number === '15')
    ret = 'Δεκαπέντε'
  else if (number === '16')
    ret = 'Δεκαέξι'
  else if (number === '17')
    ret = 'Δεκαεφτά'
  else if (number === '18')
    ret = 'Δεκαοκτώ'
  else if (number === '19')
    ret = 'Δεκαεννιά'
  else if (number === '20')
    ret = 'Είκοσι'

  return ret;
}

function getNumberLectical(number) {
  var ret = ''
  if (number === 1)
    ret = 'πρώτης'
  else if (number === 2)
    ret = 'δεύτερης'
  else if (number === 3)
    ret = 'τρίτης'
  else if (number === 4)
    ret = 'τέταρτης'
  else if (number === 5)
    ret = 'πέμπτης'
  else if (number === 6)
    ret = 'έκτης'
  else if (number === 7)
    ret = 'έβδομης'
  else if (number === 8)
    ret = 'όγδοοης'
  else if (number === 9)
    ret = 'ένατης'
  else if (number === 10)
    ret = 'δέκατης'

  return ret;
}

function extractYearFromDate(dateValue) {
  let ret = '';

  if (dateValue)
    ret = Intl.DateTimeFormat('el-GR', { year: 'numeric' }).format(new Date(dateValue))

  return ret;
}

function getDateString(protocolDate) {
  var ret;
  var day, month, year;
  if (protocolDate) {
    day = Intl.DateTimeFormat('el-GR', { day: 'numeric' }).format(new Date(protocolDate));
    month = Intl.DateTimeFormat('el-GR', { month: 'numeric' }).format(new Date(protocolDate));
    year = Intl.DateTimeFormat('el-GR', { year: 'numeric' }).format(new Date(protocolDate));
  }

  if (month == '1')
    ret = day + ' Ιανουαρίου ' + year
  else if (month == '2')
    ret = day + ' Φεβρουαρίου ' + year
  else if (month == '3')
    ret = day + ' Μαρτίου ' + year
  else if (month == '4')
    ret = day + ' Απριλίου ' + year
  else if (month == '5')
    ret = day + ' Μαΐου ' + year
  else if (month == '6')
    ret = day + ' Ιουνίου ' + year
  else if (month == '7')
    ret = day + ' Ιουλίου ' + year
  else if (month == '8')
    ret = day + ' Αυγούστου ' + year
  else if (month == '9')
    ret = day + ' Σεπτεμβρίου ' + year
  else if (month == '10')
    ret = day + ' Οκτωβρίου ' + year
  else if (month == '11')
    ret = day + ' Νοέμβριου ' + year
  else if (month == '12')
    ret = day + ' Δεκεμβρίου ' + year

  return ret;
}

function getExpiresAt(token, jwt, secretKey) {
  var expiresAt = new Date(0);

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      expiresAt.setUTCSeconds(decoded.exp);
    });
  }

  return expiresAt;
}

module.exports = {
  addQuotes,
  fixTextForRawXml,
  consoleLog,
  getWord,
  getNumberLectical,
  extractYearFromDate,
  getDateString,
  getExpiresAt
}


