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
    members: {
        slotOne:{type: mongoose.Schema.Types.ObjectId, ref: PokemonSchema},
        slotTwo:{type: mongoose.Schema.Types.ObjectId, ref: PokemonSchema},
        slotThree:{type: mongoose.Schema.Types.ObjectId, ref: PokemonSchema},
        slotFour:{type: mongoose.Schema.Types.ObjectId, ref: PokemonSchema},
        slotFive:{type: mongoose.Schema.Types.ObjectId, ref: PokemonSchema},
        slotSix:{type: mongoose.Schema.Types.ObjectId, ref: PokemonSchema}
    }
})

//?Exports
module.exports = mongoose.model('PokeTeam', PokemonTeamSchema)