//?Imports
const { error,success,incomplete } = require('../helpers/response');
const PokeTeam = require('../models/pokeTeamsModel');
const User = require('../models/userModel');
const Pokemon = require('../models/pokemonModel');
const { default: mongoose } = require('mongoose');

//?Exports to teamRoutes

//*Create Team
exports.createTeam = async (req,res) => {
    try {
        //test
        console.log(req.body);
        //data requested from client (body)
        const {teamName, amountOfMembers, teamGeneration, members,teamTypes,typesTeamIsWeakTo,typesTeamIsStrongAgainst} = req.body;

        //request user id match in db
        const userId = req.params.userId
        const user = await User.findById(userId);
        //error handling - if user id does not match user in db
        if(!user){
            return incomplete(res, "User Not Found");
        }

        //! Error handling for duplicate or already existing name in db does not function
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
            members,
            teamTypes,
            typesTeamIsWeakTo,
            typesTeamIsStrongAgainst,
            owner_id: userId
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

        const allTeams = await PokeTeam.find({owner_id: userId});

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
        deleteTeams = await PokeTeam.deleteMany({owner_id: userId});

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
        console.log("get one");
        //req user and team ID to find in db
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        //error handling if user does not match in db
        if(!user){
            return incomplete(res,'User not found');
        }
        //find team associated with user by team id in db
            const getTeam = await PokeTeam.findById(teamId);

            if(getTeam.owner_id === userId){
                success(res,getTeam);
            }else{
                incomplete(res,"no team found");
            }

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
        const toDelete = await PokeTeam.findById(teamId);
        //error handling
        if(toDelete.owner_id === userId){
            deleteTeam = await PokeTeam.findByIdAndDelete(teamId);
            //deletes team from associated user in db and updates user
            user.teams.pull(teamId);
            user.save();
            //console testing
            console.log('Deleted team: ', toDelete, 'User Teams: ', user.teams);
            //response to client
            success(res,'Team deleted');
        }else{
            return incomplete(res,'no team found');
        }
    } catch (err) {
        error(res,err);
    }
};

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

        const team = await PokeTeam.findById(teamId);

        if(team.owner_id === userId){
            //requested data from client to update document
            const info = req.body;
            //return updated doc.
            const returnOption = {new: true};
            //update team
            teamEdit = await PokeTeam.findByIdAndUpdate(teamId,info,returnOption);
            //respond to client
            success(res,teamEdit);
        } else {
            incomplete(res,"No team found");
        }
 
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
        if(originalTeam.owner_id===userId){
            //create copy of original team
            const duplicatedTeam = new PokeTeam({
                //toDo: error handle dup name
                teamName: originalTeam.teamName + '(Copy)',
                amountOfMembers: originalTeam.amountOfMembers,
                teamGeneration: originalTeam.teamGeneration,
                members: {...originalTeam.members}, //Creates shallow copy of members
                teamTypes: originalTeam.teamTypes,
                typesTeamIsWeakTo: originalTeam.typesTeamIsWeakTo,
                typesTeamIsStrongAgainst: originalTeam.typesTeamIsStrongAgainst,
                owner_id: originalTeam.owner_id
            });
    
            //save duplicated document to db
            await duplicatedTeam.save();
            user.teams.push(duplicatedTeam);
            await user.save();
            //respond to client
            success(res,duplicatedTeam);
        }else{
            return incomplete(res,"No team found");
        }
    } catch (err) {
        error(res,err);
    }
};

//*Get By Team Name
exports.getByTeamName = async (req,res) => {
    // console.log('get by name route');
    try {
        //req params
        const {userId, teamName} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res,"No user found");
        }
        //search for team name
        const nameResults = await PokeTeam.findOne({teamName: teamName, owner_id:userId});
        //error handling
        if(!nameResults){
            return incomplete(res,"No team found");
        }
        //respond to client
        success(res,nameResults);
    } catch (err) {
        error(res,err);
    }
};

//*Get By Team Game Generation
exports.getByGeneration = async (req,res) => {
    console.log('team gen route');
    try {
        //req params
        const {userId, teamGeneration} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res,"No user found");
        }
        //search for team generation
        const teams = await PokeTeam.find({teamGeneration: teamGeneration, owner_id:userId});
        //error handling
        if(!teams){
            return incomplete(res,"No teams found");
        }
        //respond to client
        success(res,teams);
    } catch (err) {
        error(res,err);
    }
}

//*Get By Amount of Members
exports.getByMemberAmount = async (req,res) => {
    try {
        console.log('member amount route')
        //req params
        const {userId, amountOfMembers} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res,'No user found');
        }
        //search for key value
        const memberCount = await PokeTeam.find({amountOfMembers:amountOfMembers, owner_id:userId});
        //error handling
        if(!memberCount){
            return incomplete(res, 'No teams found');
        }
        //respond to client
        success(res,memberCount);
    } catch (err) {
        error(res,err);
    }
};

//*Create Randomized Team
exports.createRandomTeam = async (req,res) => {
    try {
        //req user, req create team
        const {userId} = req.params;
        const {teamName, amountOfMembers, teamGeneration, members, teamType, typesTeamIsWeakTo, typesTeamIsStrongAgainst} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return incomplete(res,'User not found');
        }

        let team = {
            teamName,
            amountOfMembers,
            teamGeneration,
            members,
            teamType,
            typesTeamIsWeakTo,
            typesTeamIsStrongAgainst,
            owner_id:userId
        };
        //create team and push to user model
        let newTeam = await PokeTeam.create(team);
        
        user.teams.push(newTeam);

        //poketeam's arrays to add info
        let strongArray = newTeam.typesTeamIsStrongAgainst;
        let weakArray = newTeam.typesTeamIsWeakTo;
        let typeArray = newTeam.teamTypes;


        //inner async function -> array filter
        async function arrayFilterOne(array,value){
            if(!array.includes(value)){
                array.push(value);
            }
        }

        async function arrayFilterTwo(array,newValueArray){
            for(let value of newValueArray){
                if(!array.includes(value)){
                    array.push(value);
                }
            }
        }

        //random number generator function
        function randomPokemonGenerator() {
            //generates random number
            const randomNumber = Math.random();
            //rounds down
            const scaledNum = Math.floor(randomNumber*151)+1;
            //returns randomly generated number
            return scaledNum;
        }
        //for loop to add members to newly created team
        for(i = 0; i < newTeam.amountOfMembers;i++){
            //randomly generated number to be used to search db
            let number = randomPokemonGenerator();
            //search db for pokemon utilizing randomly generated number
            const pokemon = await Pokemon.findOne({number});
            //Update teamTypes, typesTeamIsWeakTo, typesTeamIsStrongAgainst
            //pokemon types to be added
            let primary = pokemon.primaryType;
            let secondary = pokemon.secondaryType;
            let weak = pokemon.typesWeakTo;
            let strong = pokemon.typesEffectiveAgainst;

            await arrayFilterTwo(strongArray,strong);
            await arrayFilterTwo(weakArray,weak);
            await arrayFilterOne(typeArray,primary);
            await arrayFilterOne(typeArray,secondary);
            //add pokemon to pokeTeam members array
            newTeam.members.push(pokemon);
        };
        
        //save newly created team in db -> update user
        await newTeam.save();
        await user.save();
        //response
        success(res,newTeam);

    } catch (err) {
        error(res,err);
    }
};

//*Get By Type
exports.getByType = async (req,res) => {
    try {
        //test route
        console.log('type route')
        //req params
        const {userId, teamTypes} = req.params;
        const user = await User.findById(userId);
        //error handling
        if(!user){
            return incomplete(res,'No user found');
        }
        const teams = await PokeTeam.find({teamTypes:teamTypes,owner_id:userId});
        if(teams.teamTypes != teamTypes){
            return incomplete(res,"No teams found");
        }

        //respond to client
        success(res,teams);
    } catch (err) {
        error(res,err);
    }
};