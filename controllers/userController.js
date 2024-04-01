const { error,success,incomplete } = require('../helpers/response');
const User = require('../models/userModel');

exports.getAllUsers = async (res) => {
    try {
        const users = await User.find().populate();
        success(res,users);
    } catch (err) {
        error(res,err);
    }
};

exports.getOneUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user){
            return incomplete(res, 'No User');
        }

        success(res, user);
    } catch (err) {
        error(res,err)
    }
};

exports.editUser = async (req, res) => {
    const {username, email} = req.body;
    const {userId} = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return incomplete(res, 'No User');
        }

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();

        success(res, {message: 'User Edited'});
    } catch (err) {
        error(res,err)
    }
};

exports.deleteUser = async (req,res) => {
    const {userId} = req.params;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return incomplete(res,'No User');
        }

        await user.deleteOne();
        success(res, { message:'User deleted'});
    } catch (err) {
        error(res,err)
    }
};