// var params = {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// }
  //expiresAt: process.env.TOKEN_EXPIRES_IN

var params = {
  host: 'localhost',
  database: 'Ordering2',
  user: 'postgres',
  password: '123',
  port: '5432'
}

module.exports = {
  params
}