const { error,success,incomplete } = require('../helpers/response');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;
const Joi = require('joi');

const UserJoi = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

exports.createUser = async (req,res) => {
    console.log(req.body)


    try {
        //requested data
        const userData = req.body;
        //await validation of requested data against schema
        const validatedUserData = await UserJoi.validateAsync(userData);
        //hash password
        const hashedPassword = await bcrypt.hash(validatedUserData.password, 10);
        //create new user
        const createUser = new User({
            username: validatedUserData.username,
            email: validatedUserData.email,
            password: hashedPassword
        });
        //save to db
        const newUser = await createUser.save();
        //create token
        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn:"1 day"});

        res.status(200).json({
            user:newUser,
            token
        });

    } catch (err) {
        error(res,err);
    }
}

// exports.createUser = async (req,res) => {
//     console.log(req.body)
//     try {
//         const user = new User({
//             username: req.body.username ? req.body.username : 'Input username or password',
//             password: bcrypt.hashSync(req.body.password, 13),
//             email: req.body.email
//         });

//         const newUser = await user.save();

//         const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 day"});

//         success(res,newUser,token);

//     } catch (err) {
//         error(res,err)
//     }
// }

// exports.getOneUser = async (req,res) => {
//     try {
//         const user = await User.findById(req.params.userId)
//         if (!user){
//             return incomplete(res, 'No User');
//         }

//         success(res, user);
//     } catch (err) {
//         error(res,err)
//     }
// };

// exports.editUser = async (req, res) => {
//     const {username, email} = req.body;
//     const {userId} = req.params;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return incomplete(res, 'No User');
//         }

//         user.username = username || user.username;
//         user.email = email || user.email;

//         await user.save();

//         success(res, {message: 'User Edited'});
//     } catch (err) {
//         error(res,err)
//     }
// };

// exports.deleteUser = async (req,res) => {
//     const {userId} = req.params;

//     try {
//         const user = await User.findById(userId);
//         if(!user) {
//             return incomplete(res,'No User');
//         }

//         await user.deleteOne();
//         success(res, { message:'User deleted'});
//     } catch (err) {
//         error(res,err)
//     }
// };