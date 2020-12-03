const util = require('util');
const helper = require('../../../HelperMethods/helpermethods');

function query_insertactivity(req, contractId, action) {
    var loginUserInfo = req.body.loginUserInfo;
    var itemInfo = getInfo(req);
    var ipAddress = '';

    var sqlQuery = 'INSERT INTO "Ordering"."Activities"("ContractId", "AccountId", "IpAddress", "Username", "Action", "Info", "Created", "Type")  VALUES ';
    sqlQuery += util.format('(%s,%s,%s,%s,%s,%s,%s,%s)',
        helper.addQuotes(contractId),
        helper.addQuotes(null),
        helper.addQuotes(ipAddress),
        helper.addQuotes(loginUserInfo.uid),
        helper.addQuotes(action),
        helper.addQuotes(JSON.stringify(itemInfo)),
        helper.addQuotes(new Date().toLocaleString()),
        helper.addQuotes(req.body.activityType));
    sqlQuery += ' RETURNING * ';

    return sqlQuery;
}

function getInfo(req) {
    var ret = '';

    if (req.body.activityType === 'EditContract')
        ret = req.body.contractInfo;
    else
        ret = req.body.itemInfo;
        
    return ret;
}
module.exports = {
    query_insertactivity
}