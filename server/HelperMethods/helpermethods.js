/*' -> &apos;
" -> &quot;
> -> &gt;
< -> &lt;
& -> &amp;*/

const fixTextForRawXml = (text) => {
  var ret = ''
  ret = text.replace(/&/g, '&amp;').replace(/'/g, '&apos').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/</g, '&lt;')
  return ret;
}

function addQuotes(value) {
  var ret = null;

  if (value)
    ret = '\''.concat(value.toString().replace(/'/g,"''")).concat('\'');

  return ret;
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

module.exports = {
  addQuotes,
  fixTextForRawXml,
  consoleLog,
  getWord
}


