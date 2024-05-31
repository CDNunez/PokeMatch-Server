//?Imports
const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    pokemonName:String,
    gen:Number,
    number:Number,
    primaryType:String,
    secondaryType:String,
    typesWeakTo:[String],
    typesEffectiveAgainst:[String],
    entry:String,
    abilities: {
        firstAbility: String,
        secondAbility: String,
        thirdAbility: String
    },
    baseStats:{
        attack:Number,
        defense:Number,
        specialAttack:Number,
        specialDefense:Number,
        speed:Number
    }
})

module.exports = mongoose.model('Pokemon', PokemonSchema);