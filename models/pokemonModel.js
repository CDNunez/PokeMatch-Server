const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    pokemonName:String,
    gen:Number,
    number:Number,
    type:{
        primaryType:String,
        secondaryType:String,
    },
    entry:String,
    abilities: {
        firstAbility: String,
        secondAbility: String,
        thirdAbility: String
    }
})

module.exports = mongoose.model('Pokemon', PokemonSchema);