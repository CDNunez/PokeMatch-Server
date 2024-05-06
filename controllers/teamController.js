//?Imports
const { error,success,incomplete } = require('../helpers/response');
const PokeTeam = require('../models/pokeTeamsModel');
const User = require('../models/userModel');
const Pokemon = require('../models/pokemonModel');
const { default: mongoose } = require('mongoose');

////toDo test all routes in Postman
 
////toDo: get by team name, get by gen, get by number of members, get by type, clone team

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

        //deletes all teams associated with user in db
        deleteTeams = await PokeTeam.deleteMany();
        //clears teams array of user in db
        user.teams = [];
        //updates user
        await user.save();
        //test
        console.log(user.teams);
        //respond to client
        success(res,'All teams deleted');
    } catch (err) {
        error(res,err);
    }
};

//* Get one team associated with user
exports.getOneTeam = async (req,res) => {
    try {
        //req user and team ID to find in db
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        //error handling if user does not match in db
        if(!user){
            return incomplete(res,'User not found');
        }
        //find team associated with user by team id in db
        const getTeam = await PokeTeam.findById(teamId);
        //error handling
        if(!getTeam){
            return incomplete(res,"Team not found");
        }        

        //console test
        // console.log("Team: ",getTeam);
        //client response
        success(res,getTeam);
    } catch (err) {
        error(res,err);
    }
};

//*Delete one team
exports.deleteOneTeam = async (req,res) => {
    try {
        //req params
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res,'user not found');
        }
        //deletes team from PokeTeam model db
        const deleteTeam = await PokeTeam.findByIdAndDelete(teamId);
        //error handling
        if(!deleteTeam){
            return incomplete(res,'no team found');
        }
        //deletes team from associated user in db and updates user
        user.teams.pull(teamId);
        user.save();
        //console testing
        console.log('Deleted team: ', deleteTeam, 'User Teams: ', user.teams);
        //response to client
        success(res,'Team deleted');
    } catch (err) {
        error(res,err);
    }
};

////toDo: test in postman

//*Edit one team
exports.editTeam = async (req,res) => {
    try {
        //req params
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res, "No user found");
        }
        //requested data from client to update document
        const info = req.body;
        //return updated doc.
        const returnOption = {new: true};
        //update team
        teamEdit = await PokeTeam.findOneAndUpdate(teamId,info,returnOption);
        //respond to client
        success(res,teamEdit);
    } catch (err) {
        error(res,err);
    }
};

//*Duplicate selected team
exports.duplicateTeam = async(req,res) => {
    try {
        //req params
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res, "No user found");
        }
        const originalTeam = await PokeTeam.findById(teamId);
        //error handling
        if(!originalTeam){
            return incomplete(res,"No team found");
        }
        //create copy of original team
        const duplicatedTeam = new Document({
            //toDo: error handle dup name
            teamName: originalTeam.teamName + '(Copy)',
            amountOfMembers: originalTeam.amountOfMembers,
            teamGeneration: originalTeam.teamGeneration,
            members: {...originalTeam.members} //Creates shallow copy of members
        });

        //save duplicated document to db
        await duplicatedTeam.save();
        //respond to client
        success(res,duplicatedTeam);
    } catch (err) {
        error(res,err);
    }
};