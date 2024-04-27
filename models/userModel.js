//?Import dependencies
const mongoose = require('mongoose');
const { PokemonTeamSchema } = require('./pokeTeamsModel');

////toDo Test in Postman, add JOI validation, add poketeams under user schema

//user model
// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true
//     },
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
//     // teams: PokemonTeamSchema
// });

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

module.exports = mongoose.model('User', UserSchema);