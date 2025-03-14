const app = require('./app');
const { createPokemonTable } = require('./models/pokemonModel');
const createDatabase = require('./dbSetup');
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await createDatabase();
    await createPokemonTable();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
})();