// var params = {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// }
  //expiresAt: process.env.TOKEN_EXPIRES_IN
const Pool = require('pg').Pool

var params = {
  host: 'localhost',
  database: 'Ordering2',
  user: 'postgres',
  password: '123',
  port: '5432'
}
const CONNECTION_STRING = process.env.HEROKU_POSTGRESQL_OLIVE_URL || 'postgresql://postgres:123@localhost:5432/Ordering2';
const SSL = process.env.NODE_ENV === 'production';

console.log('CONNECTION_STRING: ' + CONNECTION_STRING);
var pool = new Pool({connectionString: CONNECTION_STRING, ssl: SSL})

module.exports = {
  params,
  pool
}