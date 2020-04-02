var { Pool } = require('pg');

// host: 'localhost',
// database: 'Ordering2',
// user: 'postgres',
// password: '123',
// port: '5432'


 // postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:123@localhost:5432/Ordering2';
const SSL = process.env.NODE_ENV === 'production';

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client.', err);
      process.exit(-1);
    });

  }

  query(query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: 'Database error.' }, null);
        }
        callback({}, res.rows);
      });
    });

  }

  end() {
    this._pool.end();
  }
}

module.exports = new Database();