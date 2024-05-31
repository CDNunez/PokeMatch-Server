//?Imports
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const validateSession = require('../helpers/auth');

//*Create Team - Get All Teams - Delete All Teams
router.route('/:userId/pokeTeams')
    .post(validateSession,teamController.createTeam)
    .get(validateSession,teamController.getAllTeams)
    .delete(validateSession,teamController.deleteAllTeams);

//*Get One Team - Delete One Team - Edit One Team - Duplicate Team
router.route('/:userId/pokeTeams/:teamId')
    .get(validateSession,teamController.getOneTeam)
    .delete(validateSession,teamController.deleteOneTeam)
    .put(validateSession,teamController.editTeam)
    .post(validateSession,teamController.duplicateTeam);

//*Get By Team Name
router.route('/:userId/pokeTeams/teamName/:teamName')
    .get(validateSession,teamController.getByTeamName);

////toDo: test in postman

//*Get By Team Generation
router.route('/:userId/pokeTeams/teamGeneration/:teamGeneration')
    .get(validateSession,teamController.getByGeneration);

// //*Get By Amount of Members
router.route('/:userId/pokeTeams/amountOfMembers/:amountOfMembers')
    .get(validateSession,teamController.getByMemberAmount);

//*Create Random Team
router.route('/:userId/randomize')
    .post(validateSession,teamController.createRandomTeam);

// //*Get By Type
router.route('/:userId/pokeTeams/type/:teamTypes')
    .get(validateSession,teamController.getByType);

module.exports = router;