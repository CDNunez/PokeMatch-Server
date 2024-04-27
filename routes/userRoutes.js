const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// router.route('/:userId')
//     .get(UserController.getOneUser)
//     .put(UserController.editUser)
//     .delete(UserController.deleteUser);

router.route('/signup')
    .post(UserController.createUser);

module.exports = router;