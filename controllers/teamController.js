//?Imports
const { error,success,incomplete } = require('../helpers/response');
const PokeTeam = require('../models/pokeTeamsModel');
const User = require('../models/userModel');

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


////toDo: WIP
// exports.getAllTeams = async (req,res) => {
//     try {
//         //req user Id from client
//         const { userId } = req.params;
//         //validate user
//         const user = await User.findById(userId);
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