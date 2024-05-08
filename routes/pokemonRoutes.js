const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

//* Get All Pokemon
router.route('/pokemon')
    .get(pokemonController.getAllPokemon);

router.route('/pokemon/generation/:gen')
    .get(pokemonController.getByGeneration);

router.route('/pokemon/type/:type')
    .get(pokemonController.getByType);

router.route('/pokemon/sortByName/:name')
    .get(pokemonController.sortByName);

module.exports = router;