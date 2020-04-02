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
var pool = new Pool({connectionString: 'postgresql://postgres:123@localhost:5432/Ordering2', ssl: false})

module.exports = {
  params,
  pool
}