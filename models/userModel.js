//?Import dependencies
const mongoose = require('mongoose');
const { PokemonTeamSchema } = require('./pokeTeamsModel');

////toDo Test in Postman, add JOI validation, add poketeams under user schema

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
    }
})

//?exports
module.exports = mongoose.model('User', UserSchema);