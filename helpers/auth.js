const jwt = require('jsonwebtoken');

const authenticate = async (req, next) => {
    const token = req.header('token');
    if(!token) return next(new Error('Access Denied'));

    try {
        const verified = jwt.verify(token, process.env.JWT);
        req.userID = verified._id;
        next();
    } catch (err) {
        next(new Error('Invalid Token'));
    }
};

module.exports = {authenticate};