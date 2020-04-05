import { ExpandLessRounded } from '@material-ui/icons';

var dateFormat = require('dateformat');

export function setDimensions(store) {
  let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
  var dimensions = {};
  dimensions.width = windowDimensions[0]['width'];
  dimensions.height = windowDimensions[1]['height'];
  store.dispatch({ type: 'SCREEN_DIMENSIONS', payload: dimensions })
  return dimensions;
}

export function resetData(store) {
  store.dispatch({ type: 'RESET_ACTION', payload: null });
  setDimensions(store);
}

export function getWindowDimensions(windowWidth, windowHeight, transform, zoom) {
  var ret = []
  var scale = transform.substring(6);
  scale = Number(scale.substring(0, scale.length - 1));

  let windowWidth100 = windowWidth
  let windowHeight100 = windowHeight
  if (scale) {
    windowHeight100 = windowHeight / scale;
    windowWidth100 = windowWidth / scale;
  } else if (zoom) {
    windowHeight100 = windowHeight / Number(zoom);
    windowWidth100 = windowWidth / Number(zoom);
  }

  ret.push({ 'width': windowWidth100 })
  ret.push({ 'height': windowHeight100 })

  return ret;
}

export function getBodyHeight() {
  let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
  return windowDimensions[1]['height'] - (getHeaderHeight() + getFooterHeight());
}

export function getContractsLimit(loadedContracts) {
  let contractsItems = window.CONTRACTS_PAGING || process.env.REACT_APP_CONTRACTS_PAGING
  if (loadedContracts && loadedContracts > contractsItems)
    contractsItems = loadedContracts
  return contractsItems;
}

export function getHostUrl() {
  return ''
  //return window.SERVER_URL
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function getFpaLabel(fpaValue) {
  return 'Φ.Π.Α. ' + fpaValue + '%';
}

export function getServerErrorResponseMessage(serverError) {
  var ret = '';
  if (serverError.response) {
    ret = serverError.response && serverError.response.statusText ? serverError.response.statusText : '';
    ret += serverError.response && serverError.response.status ? '(' + serverError.response.status + ')' : '';
  } else
   ret = serverError.message

  return ret;
}

export function getFpaValueFromReservations(reservations) {
  var ret = '';
  if (reservations) {
    var fpa = reservations.find((e) => e.Name === 'Φ.Π.Α.')
    ret = parseFloat(fpa.Percentage);
  }
  return ret;
}

export function getStringInLower(input) {
  let ret = '';

  if (input) {
    input = input.toString().toLowerCase();
    const inputArray = input.split(' ');
    inputArray.forEach(element => {
      ret += capitalize(element) + ' '
    });
  }
  else
    ret = '';

  return ret.trim();
}

export function getDateFormat(dateValue) {
  let ret = '';

  if (dateValue) {
    ret = Intl.DateTimeFormat('el-GR', {
      year: 'numeric', month: 'short', day: 'numeric'
    }).format(new Date(dateValue))
  }
  else
    ret = '';

  return ret;
}

export function getDateFormatForDocument(dateValue) {
  let ret = '';

  if (dateValue) {
    ret = Intl.DateTimeFormat('el-GR', {
      day: 'numeric', month: 'numeric', year: 'numeric'
    }).format(new Date(dateValue)).replace("/", "-").replace("/", "-")
  }
  else
    ret = '';

  return ret;
}

export function extractYearFromDate(dateValue) {
  let ret = '';

  if (dateValue)
    ret = Intl.DateTimeFormat('el-GR', { year: 'numeric' }).format(new Date(dateValue))

  return ret;
}

export function getDateFormatWithDash(dateValue) {
  let ret = '';

  if (dateValue) {
    ret = Intl.DateTimeFormat('el-GR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateValue)).replace("/", "-").replace("/", "-")
  }
  else
    ret = '';

  return ret;
}

export function getDateFormatForMaterialUIComponent(dateValue) {
  let ret = '';

  if (dateValue)
    ret = dateFormat(dateValue, "yyyy-mm-dd");

  return ret;
}

export function getDateTimeFormat(dateValue) {
  let ret = '';

  if (dateValue)
    ret = dateFormat(dateValue, "dd/mm/yyyy HH:mm");

  return ret;
}

export function getValidMaterialDateFormat(dateValue) {

  var dt = new Date(dateValue);

  var dd = dt.getDate();
  var mm = dt.getMonth() + 1;
  var yyyy = dt.getFullYear();
  if (dd < 10)
    dd = '0' + dd;
  if (mm < 10)
    mm = '0' + mm;

  return yyyy + '-' + mm + '-' + dd;
}


export function getAmountInWords(amount, capital) {
  //Number(amount)
  var ret = '';
  var div, rem = '';

  //Ακέραιο μέρος
  div = Math.trunc(Number(amount) / 1000);
  rem = Math.floor(Number(amount) % 1000);
  ret += getThousandsLex(div)

  div = Math.trunc(Number(rem) / 100);
  rem = Math.floor(Number(rem) % 100);
  if (ret.length > 0)
    ret += ' '
  ret += getHundrendsLex(div)

  if (rem === 11)
    ret += "έντεκα ευρώ"
  else if (rem === 12)
    ret += "δώδεκα ευρώ"
  else {
    div = Math.trunc(Number(rem) / 10);
    rem = Math.floor(Number(rem) % 10);
    ret += getDecadesLex(div)
    ret += getUnitsLex(rem)
    ret += 'ευρώ'
  }

  //Δεκαδικό μέρος
  var decimalPart = (Number(amount) - Math.floor(Number(amount))).toFixed(2) * 100
  if (decimalPart > 0) {
    div = Math.trunc(decimalPart / 10);
    rem = Math.floor(decimalPart % 10);
    ret += ' και '
    if (decimalPart === 11)
      ret += "έντεκα"
    else if (decimalPart === 12)
      ret += "δώδεκα"
    else {
      ret += getDecadesLex(div)
      ret += getUnitsLex(rem)
      ret = ret.trim()
    }
    ret += ' λεπτών'
  }

  if (capital) {
    ret = ret.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ret = ret.toUpperCase();
  }

  return ret;
}

export function getThousandsLex(div) {
  var ret = '';

  if (div === 1)
    ret = 'χιλίων'
  else if (div === 2)
    ret = 'δυο χιλιάδων'
  else if (div === 3)
    ret = 'τριών χιλιάδων'
  else if (div === 4)
    ret = 'τεσσάρων χιλιάδων'
  else if (div === 5)
    ret = 'πέντε χιλιάδων'
  else if (div === 6)
    ret = 'έξι χιλιάδων'
  else if (div === 7)
    ret = 'εφτά χιλιάδων'
  else if (div === 8)
    ret = 'οκτώ χιλιάδων'
  else if (div === 9)
    ret = 'εννιά χιλιάδων'
  else {
    if (div > 0 && div < 100000) {
      if (div === 11)
        ret = 'έντεκα χιλιάδων'
      else if (div === 12)
        ret = 'δώδεκα χιλιάδων'
      else {
        var rem = div;
        if (div > 100) {
          ret += getHundrendsLex(Math.trunc(Number(div) / 100));
          rem = Math.floor(Number(div) % 100);
        }

        ret += getDecadesLex(Math.trunc(Number(rem) / 10));
        rem = Math.floor(Number(rem) % 10);

        ret += getUnitsLex(rem);
        ret += 'χιλιάδων';
      }
    }
  }
  return ret;
}

export function getHundrendsLex(div) {
  var ret = '';
  if (div === 1)
    ret = 'εκατόν'
  else if (div === 2)
    ret = 'διακοσίων'
  else if (div === 3)
    ret = 'τριακοσίων'
  else if (div === 4)
    ret = 'τετρακοσίων'
  else if (div === 5)
    ret = 'πεντακοσίων'
  else if (div === 6)
    ret = 'εξακοσίων'
  else if (div === 7)
    ret = 'εφτακοσίων'
  else if (div === 8)
    ret = 'οκτακοσίων'
  else if (div === 9)
    ret = 'εννιακοσίων'

  ret += ' ';
  return ret;
}

export function getDecadesLex(div) {
  var ret = '';
  if (div === 1)
    ret = 'δέκα'
  else if (div === 2)
    ret = 'είκοσι'
  else if (div === 3)
    ret = 'τριάντα'
  else if (div === 4)
    ret = 'σαράντα'
  else if (div === 5)
    ret = 'πενήντα'
  else if (div === 6)
    ret = 'εξήντα'
  else if (div === 7)
    ret = 'εβδημόντα'
  else if (div === 8)
    ret = 'ογδόντα'
  else if (div === 9)
    ret = 'ενενήντα'

  ret += ' ';
  return ret;
}

export function getUnitsLex(div) {
  var ret = '';
  if (div === 1)
    ret = 'ενός'
  else if (div === 2)
    ret = 'δύο'
  else if (div === 3)
    ret = 'τριών'
  else if (div === 4)
    ret = 'τεσσάρων'
  else if (div === 5)
    ret = 'πέντε'
  else if (div === 6)
    ret = 'έξι'
  else if (div === 7)
    ret = 'εφτά'
  else if (div === 8)
    ret = 'οκτώ'
  else if (div === 9)
    ret = 'εννιά'

  ret += ' ';
  return ret;
}

export function getHeaderHeight() {
  return 70;
}

export function getFooterHeight() {
  return 30;
}