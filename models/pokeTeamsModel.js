const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PokemonSchema } = require('./pokemonModel');

const PokemonTeamSchema = new Schema({
    teamName: {
        type:String,
        required:true
    },
    amountOfMembers: {
        type: Number,
        enum: [2,3,4,5,6],
        default: 2,
        required: true
    },
    teamGeneration: {
        type: Number,
        enum: [null, 1,2,3,4],
        default: null,
        required: true
    },
    slotOne: [PokemonSchema],
    slotTwo: [PokemonSchema],
    slotThree: [PokemonSchema],
    slotFour: [PokemonSchema],
    slotFive: [PokemonSchema],
    slotSix: [PokemonSchema],
})

module.exports = mongoose.model('PokeTeam', PokemonTeamSchema)