//?Import dependencies
const mongoose = require('mongoose');
const PokemonTeamSchema = require('./pokeTeamsModel');

//*user model used in userController: username, email, password, pokeTeams
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    //reference to pokemon team schema which models the structure of created teams
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: PokemonTeamSchema}]
});

//?exports
module.exports = mongoose.model('User', UserSchema);