//?Imports
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// router.route('/:userId')
//     .get(UserController.getOneUser)
//     .put(UserController.editUser)
//     .delete(UserController.deleteUser);

//?Routes

//*Signup
router.route('/signup')
    .post(UserController.createUser);

//*Login
router.route('/login')
    .post(UserController.userLogin);


module.exports = router;