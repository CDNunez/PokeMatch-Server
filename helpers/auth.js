//?Import
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { error } = require('./response');

const validateSession = async (req,res,next) => {
    try {
        //request user token
        const token = req.headers.authorization;
        //check status of token -- if it's expired
        const decoded = await jwt.verify(token,process.env.JWT);
        //log for confirmation
        console.log(decoded);
        //if token is valid => generate variable with user info
        const user = await User.findById(decoded.id);
        //error handling for if token does not match existing user
        if(!user) throw new Error('User not found');
        req.user = user;

        return next();

    } catch (err) {
        error(res,err);
    }
};

//?Export
module.exports = validateSession;