const express = require('express');
const dotenv = require('dotenv');
const { createPokemonTable } = require('./models/pokemonModel');
const pokemonRoutes = require('./routes/pokemonRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/pokemons', pokemonRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createPokemonTable();
});
