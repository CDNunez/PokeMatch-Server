//?Imports
const mongoose = require('mongoose');
const PokemonSchema  = require('./pokemonModel');

const PokemonTeamSchema = new mongoose.Schema({
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
        type: String,
        enum: [null, 1,2,3,4],
        default: null,
        required: true
    },
    //members making up the team whose model is linked from the Pokemon Schema
    members: [{type: mongoose.Schema.Types.Object, ref:PokemonSchema}],
    //Arrays to be filled with properties from the team's members. Might utilize useState on the front end
    teamTypes:[String],
    typesTeamIsWeakTo:[String],
    typesTeamIsStrongAgainst:[String]
})

//?Exports
module.exports = mongoose.model('PokeTeam', PokemonTeamSchema)