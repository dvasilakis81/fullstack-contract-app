import format from 'string-format'
import { ContactSupportOutlined } from '@material-ui/icons';

var dateFormat = require('dateformat');

export function isTokenExpired(tokenjwt) {
  var ret = false;

  var dtNow = new Date();
  if (tokenjwt && tokenjwt.data && tokenjwt.data.expiresAt) {
    var tokenExpiresAt = new Date(tokenjwt.data.expiresAt);
    //console.log('isTokenExpired');
    //console.log('tokenExpiresAt:' + tokenExpiresAt);
    //console.log('dtNow:' + dtNow);
    if (tokenExpiresAt <= dtNow)
      ret = true;
    else
      ret = false;
  } else
    ret = true;

  return ret;
}

export function tokenExpiresAt(tokenjwt) {
  var ret = ''

  var dtNow = new Date()
  if (tokenjwt && tokenjwt.data) {
    var dtTokeExpiresAt = new Date(tokenjwt.data.expiresAt);
    var dtDiffs = (dtTokeExpiresAt - dtNow)
    if (dtDiffs <= 0)
      return 'Η συνεδρία έληξε!';
    else {
      var diffMins = Math.round(dtDiffs / 60000);
      return format('H συνεδρία θα λήξει σε {} {}! {}', diffMins, diffMins > 1 ? 'λεπτά' : 'λεπτό', diffMins < 5 ? 'Θα ήταν προτιμότερο να γίνει έξοδος!' : '');
    }
  }

  // if (tokenjwt && tokenjwt.data && tokenjwt.data.expiresAt)
  //   return <Moment toNow> {new Date(tokenjwt.data.expiresAt).toString('YYYY-MM-DDTHH:mm:ssZ')}</Moment>
  // // return <Moment toNow> {tokenjwt.data.expiresAt.format('YYYY-MM-DD HH:mm:ss')}</Moment>
  // // return <Moment toNow>2020-5-19 17:41:18</Moment>

  return ret;
}

export function setDimensions(store) {
  let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
  var dimensions = {};
  dimensions.width = windowDimensions[0]['width'];
  dimensions.height = windowDimensions[1]['height'];
  store.dispatch({ type: 'SCREEN_DIMENSIONS', payload: dimensions })
  return dimensions;
}

export function resetData(store) {
  console.log('resetData just called')
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
  if (process.env.NODE_ENV === 'production')
    return ''
  else
    return window.SERVER_URL
}

export function getLoginUrl(url, isLdap, username, password) {
  var ret = '';

  if (isLdap === true)
    ret = url + '/loginWithLDAP?u=' + username + '&p=' + password;
  else
    ret = url + '/login?u=' + username + '&p=' + password;

  return ret;
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

/* ES6 */
export function findLocalIp() {
  return new Promise((resolve, reject) => {
    window.RTCPeerConnection = window.RTCPeerConnection
      || window.mozRTCPeerConnection
      || window.webkitRTCPeerConnection;

    if (typeof window.RTCPeerConnection == 'undefined')
      return reject('WebRTC not supported by browser');

    let pc = new RTCPeerConnection();
    let ips = [];

    pc.createDataChannel("");
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .catch(err => reject(err));
    pc.onicecandidate = event => {
      if (!event || !event.candidate) {
        // All ICE candidates have been sent.
        if (ips.length == 0)
          return reject('WebRTC disabled or restricted by browser');

        return resolve(ips);
      }

      let parts = event.candidate.candidate.split(' ');
      let [base, componentId, protocol, priority, ip, port, , type, ...attr] = parts;
      let component = ['rtp', 'rtpc'];

      if (!ips.some(e => e == ip))
        ips.push(ip);
      
      console.log(" candidate: " + base.split(':')[1]);
      console.log(" component: " + component[componentId - 1]);
      console.log("  protocol: " + protocol);
      console.log("  priority: " + priority);
      console.log("        ip: " + ip);
      console.log("      port: " + port);
      console.log("      type: " + type);

      if (attr.length) {
        console.log("attributes: ");
        for (let i = 0; i < attr.length; i += 2)
          console.log("> " + attr[i] + ": " + attr[i + 1]);
      }

      console.log();
    }
  });
}
