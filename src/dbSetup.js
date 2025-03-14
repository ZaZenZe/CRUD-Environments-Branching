const pgtools = require('pgtools');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const dbName = process.env.DB_NAME;

function createDatabase() {
  return new Promise((resolve, reject) => {
    pgtools.createdb(config, dbName, (err, res) => {
      if (err) {
        if (err.name === 'duplicate_database') {
          console.log('Database already exists');
          return resolve();
        } else {
          return reject(err);
        }
      }
      console.log('Database created successfully');
      resolve();
    });
  });
}

module.exports = createDatabase;