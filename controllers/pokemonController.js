const { error,success,incomplete } = require('../helpers/response');
const Pokemon = require('../models/pokemonModel');

//*Get All Pokemon
exports.getAllPokemon = async (res) => {
    try {
        const allPokemon = await Pokemon.find();
        success(res,allPokemon);
    } catch (err) {
        error(res,err);
    }
};

exports.getByGeneration = async (req,res) => {
    try {
        //req params
        const { gen } = req.params;
        //
    } catch (err) {
        error(res,err);
    }
}

exports.getByType = async (res) => {
    try {
        
    } catch (err) {
        error(res,err);
    }
}

exports.sortByName = async (res) => {
    try {
        
    } catch (err) {
        error(res,err);
    }
}

//////toDO: Ideas for controllers: get by type advantage