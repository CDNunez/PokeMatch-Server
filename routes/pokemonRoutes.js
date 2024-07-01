const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const validateSession = require('../helpers/auth');

//* Get All Pokemon
router.route('/')
    .get(pokemonController.getAllPokemon);

//*Get Pokemon By Generation in game
router.route('/generation/:gen')
    .get(pokemonController.getByGeneration);

//*Get All Pokemon By Type
router.route('/type/:primaryType')
    .get(pokemonController.getByType);

//*Get All Pokemon By Type Advantage
router.route('/advantage/:typesEffectiveAgainst')
    .get(pokemonController.getByAdvantage);

//*Get By Name
router.route('/sortByName/:pokemonName')
    .get(pokemonController.sortByName);

//*Add Pokemon to team - Delete Pokemon From Team
router.route('/:userId/pokeTeams/:teamId/pokemon/:pokemonId')
    .put(validateSession,pokemonController.addToTeam)
    .delete(validateSession,pokemonController.deleteFromTeam)

//*Duplicate Pokemon in team
router.route('/:userId/pokeTeams/:teamId/duplicate/:pokemonId')
    .put(validateSession,pokemonController.duplicatePokemon);

//*Add One Random Pokemon to team
router.route('/:userId/pokeTeams/:teamId/random/')
    .put(validateSession,pokemonController.addOneRandom);

module.exports = router;