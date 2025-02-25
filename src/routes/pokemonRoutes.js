const express = require('express');
const { getPokemons, addPokemon, updatePokemon, deletePokemon } = require('../controllers/pokemonController');

const router = express.Router();

router.get('/', getPokemons);
router.post('/', addPokemon);
router.put('/:id', updatePokemon);
router.delete('/:id', deletePokemon);

module.exports = router;
