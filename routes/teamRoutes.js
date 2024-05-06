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

// router.route('/:userId/pokeTeams/teamName/:teamName')
//     .get(teamController.getByTeamName);

// router.route('/:userId/pokeTeams/amountOfMembers/:amountOfMembers')
//     .get(teamController.getByNumberOfMembers);

// router.route('/:userId/pokeTeams/teamGeneration/:teamGeneration')
//     .get(teamController.getByGeneration);

module.exports = router;