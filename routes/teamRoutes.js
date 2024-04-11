const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.route('/:userId/pokeTeams/')
    .get(teamController.getAllTeams)
    .post(teamController.addTeam)
    .delete(teamController.deleteAllTeams);

router.route('/:userId/pokeTeams/:pokeTeamId')
    .get(teamController.getOneTeam)
    .patch(teamController.editTeam)
    .delete(teamController.deleteOneTeam);



module.exports = router;