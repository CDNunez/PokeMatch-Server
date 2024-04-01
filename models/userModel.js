//?Import dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Joi = require('joi');

////toDo Test in Postman

//to be used for user validation
const schema = Joi.object({
    //username must be a string, 3 to 30 char longs, required
    username: Joi.string().alphanum().min(3).max(30).required(),
    //password similar to username
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')),
    //email wont be required
    email: Joi.string().email()
});

//user model
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

//user validator
const validateUser = (user) => {
    const { error } = schema.validate(user);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

//verify user
UserSchema.pre('save', async function (next) {
    const user = {
        username: this.username,
        email: this.email
    };

    if (this.isModified('password')){
        if (!this.password) {
            throw new Error('Password is required');
        }
        user.password = this.password;
        this.password = await bcrypt.hash(this.password, 10);
    }
    validateUser(user);
    next();
});

//verify password
UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);