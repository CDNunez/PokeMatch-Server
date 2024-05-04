//?Imports
const { error,success,incomplete } = require('../helpers/response');
const PokeTeam = require('../models/pokeTeamsModel');
const User = require('../models/userModel');
const Pokemon = require('../models/pokemonModel');

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

        //request user id match in db
        const userId = req.params.userId
        const user = await User.findById(userId);
        //error handling - if user id does not match user in db
        if(!user){
            return incomplete(res, "User Not Found");
        }

        ////toDo: test error handling
        //error handling - if team already exists in db
        //filter that finds existing teamName in db
        const alreadyExists = user.teams.find(team => team.teamName === teamName);

        //if team name already exists - dont duplicate team - respond team already exists
        if(alreadyExists){
            return incomplete(res, "Team Name Already Exists");
        };
        
        //create team using provided model
        const team = {
            teamName,
            amountOfMembers,
            teamGeneration,
            members
        };
        
        //save team to db
        const newTeam = await PokeTeam.create(team);
        user.teams.push(newTeam);

        await user.save();

        //client response
        success(res,newTeam);

    } catch (err) {
        error(res,err);
    }
};

//*Get all teams associated with user
exports.getAllTeams = async (req,res) => {
    try {
        //req user Id from client and find user in db by userId
        const { userId } = req.params;
        const user = await User.findById(userId);

        //error handling - if user id does not exist
        if(!user){
            return incomplete(res,"Profile not found");
        }

        //find teams in db through model

        const allTeams = await PokeTeam.find();

        //client response

        success(res,allTeams);

    } catch (err) {
        error(res,err);
    }
};

//*Delete all teams associated with user
exports.deleteAllTeams = async (req,res) => {
    try {
        //require ID from user and find user in db
        const { userId } = req.params;
        const user = await User.findById(userId);

        //error handling if user does not exist in db
        if(!user){
            return incomplete(res,'User not found');
        }

        deleteTeams = await PokeTeam.deleteMany();
        user.teams = [];
        await user.save();
        
        console.log(user.teams);

        //respond to client
        success(res,'All teams deleted');
    } catch (err) {
        error(res,err);
    }
}

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