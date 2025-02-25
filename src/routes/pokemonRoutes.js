const express = require('express');
const { getPokemons, addPokemon, deletePokemon } = require('../controllers/pokemonController');

const router = express.Router();

router.get('/', getPokemons);
router.post('/', addPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;
