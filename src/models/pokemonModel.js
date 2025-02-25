const pool = require('../config/db');

const createPokemonTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS pokemon (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      colour VARCHAR(50) NOT NULL,
      pokemon VARCHAR(100) NOT NULL
    );
  `;
  await pool.query(query);
};

module.exports = { createPokemonTable };
