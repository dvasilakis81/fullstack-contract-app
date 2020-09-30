// var params = {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// }
  //expiresAt: process.env.TOKEN_EXPIRES_IN

  // heroku pg:pull HEROKU_POSTGRESQL_OLIVE orderingappdb --app ordering-app-munathens
  // heroku pg:push orderingappdb heroku_postgresql_olive --app ordering-app-munathens
  // https://ordering-app-munathens.herokuapp.com/contracts
  const Pool = require('pg').Pool

  var params = {
    host: 'localhost',
    database: 'orderingappdb',
    user: 'postgres',
    password: '123',
    port: '5432'
  }
  
  //const CONNECTION_STRING = process.env.HEROKU_POSTGRESQL_OLIVE_URL || 'postgresql://postgres:123@localhost:5432/orderingappdb';
  //const CONNECTION_STRING = 'postgresql://postgres:123@ordering.cityofathens.gr:5432/orderingappdb';
  const CONNECTION_STRING = 'postgresql://postgres:123@127.0.0.1:5432/orderingappdb';
  //const SSL = process.env.NODE_ENV === 'production';
  const SSL = false;
  
  console.log('CONNECTION_STRING: ' + CONNECTION_STRING);
  const pool = new Pool({connectionString: CONNECTION_STRING, ssl: SSL})
  
  module.exports = {
    params,
    pool,
    query: (text, params) => pool.query(text, params)
  }