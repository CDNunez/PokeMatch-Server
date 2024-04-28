//?Imports
const { error,success,incomplete } = require('../helpers/response');
const PokeTeam = require('../models/pokeTeamsModel');

////toDo test all routes in Postman
 
////toDo: create team, get all get one, edit, delete one, delete all, get by team name, get by gen, get by number of members, get by type, clone team

//?Exports to teamRoutes

//*Create Team
exports.createTeam = async (req,res) => {
    try {
        //test
        console.log(req.body);
        //data requested from client (body)
        const {teamName, amountOfMembers, teamGeneration, members} = req.body;
    } catch (err) {
        error(res,err);
    }
}
// exports.getAllTeams = async (res) => {
//     try {
//         const teams = await PokeTeam.find().populate();
//         success(res,teams);
//     } catch (err) {
//         error(res,err);
//     }
// }

// exports.getByTeamName = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err)
//     }
// }

// exports.getByGeneration = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err)
//     }
// }

// exports.getByNumberOfMembers = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err)
//     }
// }

// exports.getByTeamTyping = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err)
//     }
// }

// exports.getOneTeam = async (res) => {
//     try {
//         const teamId = req.params;
//     } catch (err) {
//         error(res,err);
//     }
// }

// exports.addTeam = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res, err);
//     }
// }

// exports.cloneTeam = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err)
//     }
// }

// exports.editTeam = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err);
//     }
// }

// exports.deleteOneTeam = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err);
//     }
// }

// exports.deleteAllTeams = async (res) => {
//     try {
        
//     } catch (err) {
//         error(res,err);
//     }
// }