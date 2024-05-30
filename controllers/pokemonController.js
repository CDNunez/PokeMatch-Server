const { error,success,incomplete } = require('../helpers/response');
const Pokemon = require('../models/pokemonModel');
const User = require('../models/userModel');
const PokeTeam = require('../models/pokeTeamsModel');

//*Get All Pokemon
exports.getAllPokemon = async (req,res) => {
    try {
        const allPokemon = await Pokemon.find();
        success(res,allPokemon);
    } catch (err) {
        return res.status(500).send(`Error: ${err.message}`);
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

//*Get By Pokemon Type : primary or secondary
exports.getByType = async (req,res) => {
    try {
        //req params
        const { primaryType } = req.params;
        //error handling
        if(!primaryType){
            return incomplete(res,"No type match found");
        }
        //search for type
        const pokeType = await Pokemon.find({primaryType});
        //respond to client
        success(res,pokeType)
    } catch (err) {
        error(res,err);
    }
};

//*Get Pokemon By Type Advantage
exports.getByAdvantage = async (req,res) => {
    try {
        const { typesEffectiveAgainst } = req.params;
        if(!typesEffectiveAgainst){
            return incomplete(res,"No type match found");
        }
        const pokeType = await Pokemon.find({typesEffectiveAgainst});
        success(res,pokeType);
    } catch (err) {
        error(res,err);
    }
}

//*Get Pokemon By Name
exports.sortByName = async (req,res) => {
    try {
        const {pokemonName} = req.params;
        //search for matching name in db
        const pokemonNameResults = await Pokemon.find({pokemonName});
        //error handling
        if(!pokemonNameResults){
            return incomplete(res,"No pokemon matches that name");
        }
        //client response
        success(res,pokemonNameResults);
    } catch (err) {
        return res.status(500).send(`Error: ${err.message}`);
    }
};

//toDo:Test due to type changes
//*Add Pokemon to team
exports.addToTeam = async (req,res) => {
    try {
        console.log('add pokemon route');
        //req params -> user id, team id, pokemon id
        const {userId, teamId,pokemonId} = req.params;
        const user = await User.findById(userId);
        const pokeTeam = await PokeTeam.findById(teamId);
        const pokemon = await Pokemon.findById(pokemonId);
        //error handling
        if(!user){
            return incomplete(res,'User not found');
        };
        if(!pokeTeam){
            return incomplete(res,"Team not found");
        };
        if(!pokemon){
            return incomplete(res,"Pokemon not found");
        };

        //WIP
        // if(pokemon.primaryType){
        //     let type = pokemon.primaryType;
            
        // }

        pokeTeam.members.push(pokemon);
        await pokeTeam.save();

        //client response
        success(res,pokeTeam);

    } catch (err) {
        error(res,err);
    }
};

//*Delete Pokemon From Team
exports.deleteFromTeam = async (req,res) => {
    try {
        console.log('delete pokemon from team route');
        const {userId, teamId, pokemonId} = req.params;
        const user = await User.findById(userId);
        const pokeTeam = await PokeTeam.findById(teamId);
        const pokemon = await Pokemon.findById(pokemonId);
        
        if(!user){
            return incomplete(res,"No user found");
        }
        if(!pokeTeam){
            return incomplete(res,"No team found");
        }
        if(!pokemon){
            return incomplete(res,"No pokemon found");
        }

        pokeTeam.members.pull(pokemon);
        pokeTeam.save();

        success(res, "Member Deleted");

    } catch (err) {
        error(res,err);
    }
};

//client side -> onClick of Duplicate button will supply server with to-be-duplicated pokemonId
//*Duplicate Selected Pokemon Within Team
exports.duplicatePokemon = async (req,res) => {
    try {
        const {userId,teamId,pokemonId} = req.params;
        const user = await User.findById(userId);
        const team = await PokeTeam.findById(teamId);
        const duplicatedPokemon = await Pokemon.findById(pokemonId);

        if(!user){
            return incomplete(res,"No user found");
        }
        if(!team){
            return incomplete(res,"No team found");
        }
        if(!duplicatedPokemon){
            return incomplete(res,'No pokemon found');
        }

        team.members.push(duplicatedPokemon);
        await team.save();

        success(res,team);
    } catch (err) {
        error(res,err);
    }
};

// /* //ToDo: Test -> disregard comment if it works
// route will add pokemon to team by finding pokemon by the pokemon's assigned number
// random number generator will be implemented in the front end
//     -click on "add random" button
//     -onClick run randomNumberGenerator function
//     function randomNumberGenerator(){
//         return Math.floor(Math.random()*151)+1;
//     }
//     const randomNumber  = randomNumberGenerator();
//     -pass randomly generated number as the requested number parameter for the route
// */
//*Add Random Pokemon to Team
exports.addOneRandom = async (req,res) => {
    try {
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        const pokeTeam = await PokeTeam.findById(teamId);
        if(!user){
            return incomplete(res,"No user found");
        }
        if(!pokeTeam){
            return incomplete(res,"No team found");
        }
        
        function randomNumberGenerator(){
            return Math.floor(Math.random()*151)+1;
        }

        const randomNumber = randomNumberGenerator();

        let number = randomNumber

        const pokemon = await Pokemon.findOne({number});

        if(!pokemon){
            return incomplete(res,"No pokemon found");
        }


        pokeTeam.members.push(pokemon);
        await pokeTeam.save();

        //client response
        success(res,pokeTeam);
    } catch (err) {
        error(res,err);
    }
};