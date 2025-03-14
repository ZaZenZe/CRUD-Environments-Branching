const express = require('express');
const dotenv = require('dotenv');
const pokemonRoutes = require('./routes/pokemonRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/pokemons', pokemonRoutes);

module.exports = app;