const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const validateSession = require('../helpers/auth');

//* Get All Pokemon
router.route('/pokemon')
    .get(pokemonController.getAllPokemon);

//*Get Pokemon By Generation in game
router.route('/pokemon/generation/:gen')
    .get(pokemonController.getByGeneration);

//*Get Pokemon By Type
router.route('/pokemon/type/:primaryType')
    .get(pokemonController.getByType);

//*Get By Name
router.route('/pokemon/sortByName/:pokemonName')
    .get(pokemonController.sortByName);

//*Add Pokemon to team - Delete Pokemon From Team
router.route('/:userId/pokeTeams/:teamId/pokemon/:pokemonId')
    .put(validateSession,pokemonController.addToTeam)
    .delete(validateSession,pokemonController.deleteFromTeam);
module.exports = router;