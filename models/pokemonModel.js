const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    name:String,
    gen:String,
    number:Number,
    type:{
        primaryType:String,
        secondaryType:String,
    },
    entry:String,
    abilities:String,
})

module.exports = mongoose.model('Pokemon', PokemonSchema);