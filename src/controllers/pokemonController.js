const pool = require('../config/db');

const getPokemons = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemon');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPokemon = async (req, res) => {
  const { name, colour, pokemon } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pokemon (name, colour, pokemon) VALUES ($1, $2, $3) RETURNING *',
      [name, colour, pokemon]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePokemon = async (req, res) => {
  const { id } = req.params;
  const { name, colour, pokemon } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pokemon SET name = $1, colour = $2, pokemon = $3 WHERE id = $4 RETURNING *',
      [name, colour, pokemon, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM pokemon WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.json({ message: "Pokemon deleted", deletedPokemon: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPokemons, addPokemon, updatePokemon, deletePokemon };
