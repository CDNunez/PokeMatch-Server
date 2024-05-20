const { error,success,incomplete } = require('../helpers/response');
const Pokemon = require('../models/pokemonModel');
const User = require('../models/userModel');
const PokeTeam = require('../models/pokeTeamsModel');

////toDo: All must be tested. Test individually as to not break the code.

//*Get All Pokemon
exports.getAllPokemon = async (res) => {
    try {
        const allPokemon = await Pokemon.find();
        success(res,allPokemon);
    } catch (err) {
        error(res,err);
    }
};

//*Get By Generation in Game
exports.getByGeneration = async (req,res) => {
    try {
        //req params
        const { gen } = req.params;
        //error handling
        if(!gen){
            return incomplete(res,"No gen found");
        }
        //search for available pokemon within specified gen
        const pokeGen = await Pokemon.find({gen});
        //respond to client
        success(res,pokeGen);
    } catch (err) {
        error(res,err);
    }
};

//!This might not actually work
//*Get By Pokemon Type : primary or secondary
exports.getByType = async (req,res) => {
    try {
        //req params
        const { type } = req.params;
        //error handling
        if(!type){
            return incomplete(res,"No type match found");
        }
        //search for type
        const pokeType = await Pokemon.find({type});
        //respond to client
        success(res,pokeType)
    } catch (err) {
        error(res,err);
    }
};

//*Get Pokemon By Name
exports.sortByName = async (res) => {
    try {
        //search for matching name in db
        const pokemonNameResults = await Pokemon.find({pokemonName});
        //error handling
        if(!pokemonNameResults){
            return incomplete(res,"No pokemon matches that name");
        }
        //client response
        success(res,pokemonNameResults);
    } catch (err) {
        error(res,err);
    }
};

////toDo: test in postman
//*Add Pokemon to team
exports.addToTeam = async (req,res) => {
    try {
        //requested data from the client - data matching pokemon model on db
        const {pokemonName,gen,number,type,entry,abilities} = req.body;
        //req params -> user id and team id
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        const pokeTeam = await PokeTeam.findById(teamId);
        //error handling
        if(!user){
            return incomplete(res,'User not found');
        };
        if(!pokeTeam){
            return incomplete(res,"Team not found");
        };
        //pokemon to be created with requested parameters from client
        const addPokemon = {
            pokemonName,
            gen,
            number,
            type,
            entry,
            abilities
        };
        //push to assigned team array of members, save team, and save user
        pokeTeam.members.push(addPokemon);
        await pokeTeam.save();
        await user.save();

        //client response
        success(res,pokeTeam);

    } catch (err) {
        error(res,err);
    }
};
//////toDO: Ideas for controllers: get by type advantage