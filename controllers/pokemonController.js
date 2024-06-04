//?Imports
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
        //search for available pokemon within specified generation
        const pokeGen = await Pokemon.find({gen});
        //respond to client
        success(res,pokeGen);
    } catch (err) {
        error(res,err);
    }
};

//*Get By Pokemon By Primary Type
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

////toDo: Get Pokemon By Primary Type or Secondary Type -- could repurpose above controller

//*Get Pokemon By Type Advantage
exports.getByAdvantage = async (req,res) => {
    try {
        //req params
        const { typesEffectiveAgainst } = req.params;
        //error handling
        if(!typesEffectiveAgainst){
            return incomplete(res,"No type match found");
        }
        //find match
        const pokeType = await Pokemon.find({typesEffectiveAgainst});
        //response
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

//toDo:Test due to type changes in pokeTeam model
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

        //*Update teamTypes, typesTeamIsWeakTo, typesTeamIsStrongAgainst

        //pokemon types to be added
        let primary = pokemon.primaryType;
        let secondary = pokemon.secondaryType;
        let weak = pokemon.typesWeakTo;
        let strong = pokemon.typesEffectiveAgainst;

        //poketeam's arrays to add info
        let strongArray = pokeTeam.typesTeamIsStrongAgainst;
        let weakArray = pokeTeam.typesTeamIsWeakTo;
        let typeArray = pokeTeam.teamTypes;

    //*inner async function to filter types -> primary, secondary
    async function arrayFilterOne(array,value){
        if(!array.includes(value)){
            array.push(value)
        }
    }

    //*inner async function to filter arrays ->strong,weak
    async function arrayFilterTwo(array,newValueArray){
        for (let value of newValueArray){
            if(!array.includes(value)){
               array.push(value);
            }
        }
    }
    //*await filter function to add values to arrays
    await arrayFilterTwo(strongArray,strong);
    await arrayFilterTwo(weakArray,weak);
    await arrayFilterOne(typeArray,primary);
    await arrayFilterOne(typeArray,secondary);

    //update db
    pokeTeam.members.push(pokemon);
    await pokeTeam.save();
    //response
    success(res,pokeTeam);

    } catch (err) {
        error(res,err);
    }
};

//*Delete Pokemon From Team
exports.deleteFromTeam = async (req,res) => {
    try {
        //test route
        console.log('delete pokemon from team route');
        //req params
        const {userId, teamId, pokemonId} = req.params;
        const user = await User.findById(userId);
        const pokeTeam = await PokeTeam.findById(teamId);
        //could replace with:
        //const deletePokemon = await Pokemon.findOneAndDelete(pokemonId);
        const pokemon = await Pokemon.findOne(pokemonId);
        //error handling
        if(!user){
            return incomplete(res,"No user found");
        }
        if(!pokeTeam){
            return incomplete(res,"No team found");
        }
        if(!pokemon){
            return incomplete(res,"No pokemon found");
        }

        //toDo: Update teamTypes, typesTeamIsWeakTo, typesTeamIsStrongAgainst

        //update db
        pokeTeam.members.pull(pokemon);
        pokeTeam.save();
        //response
        success(res, "Member Deleted");

    } catch (err) {
        error(res,err);
    }
};

//client side -> onClick of Duplicate button will supply server with to-be-duplicated pokemonId
//*Duplicate Selected Pokemon Within Team
exports.duplicatePokemon = async (req,res) => {
    try {
        //req params
        const {userId,teamId,pokemonId} = req.params;
        const user = await User.findById(userId);
        const team = await PokeTeam.findById(teamId);
        const duplicatedPokemon = await Pokemon.findById(pokemonId);
        //error handling
        if(!user){
            return incomplete(res,"No user found");
        }
        if(!team){
            return incomplete(res,"No team found");
        }
        if(!duplicatedPokemon){
            return incomplete(res,'No pokemon found');
        }
        //update db
        team.members.push(duplicatedPokemon);
        await team.save();
        //response
        success(res,team);
    } catch (err) {
        error(res,err);
    }
};

//*Add Random Pokemon to Team
exports.addOneRandom = async (req,res) => {
    try {
        //req params
        const {userId, teamId} = req.params;
        const user = await User.findById(userId);
        const pokeTeam = await PokeTeam.findById(teamId);
        //error handling
        if(!user){
            return incomplete(res,"No user found");
        }
        if(!pokeTeam){
            return incomplete(res,"No team found");
        }
        //RNG Function
        function randomNumberGenerator(){
            return Math.floor(Math.random()*151)+1;
        }

        const randomNumber = randomNumberGenerator();

        let number = randomNumber
        //find random pokemon 
        const pokemon = await Pokemon.findOne({number});
        //error handling
        if(!pokemon){
            return incomplete(res,"No pokemon found");
        }

        //Update teamTypes, typesTeamIsWeakTo, typesTeamIsStrongAgainst
        //pokemon types to be added
        //?these two are single values
        let primary = pokemon.primaryType;
        let secondary = pokemon.secondaryType;
        //?these two are arrays
        let weak = pokemon.typesWeakTo;
        let strong = pokemon.typesEffectiveAgainst;
       
        //poketeam's arrays to add info to
        let strongArray = pokeTeam.typesTeamIsStrongAgainst;
        let weakArray = pokeTeam.typesTeamIsWeakTo;
        let typeArray = pokeTeam.teamTypes;
       
        //*inner async function to filter types -> primary, secondary
        async function arrayFilterOne(array,value){
            if(!array.includes(value)){
                array.push(value)
            }
        }
       
        //*inner async function to filter arrays ->strong,weak
        async function arrayFilterTwo(array,newValueArray){
            for (let value of newValueArray){
                if(!array.includes(value)){
                    array.push(value);
                }
            }
        }
        //*await filter function to add values to arrays
        await arrayFilterTwo(strongArray,strong);
        await arrayFilterTwo(weakArray,weak);
        await arrayFilterOne(typeArray,primary);
        await arrayFilterOne(typeArray,secondary);

        //update db -> add pokemon to member array in pokeTeam -> save pokeTeam
        pokeTeam.members.push(pokemon);
        await pokeTeam.save();
        //client response
        success(res,pokeTeam);
    } catch (err) {
        error(res,err);
    }
};