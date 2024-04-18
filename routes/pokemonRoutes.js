const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.route('/')
    .get(pokemonController.getAllPokemon);

router.route('/generation/:gen')
    .get(pokemonController.getByGeneration);

router.route('/type/:type')
    .get(pokemonController.getByType);

router.route('/sortByName/:name')
    .get(pokemonController.sortByName);

module.exports = router;