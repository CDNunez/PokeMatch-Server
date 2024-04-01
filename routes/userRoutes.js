const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../helpers/auth');

router.route('/:userId')
    .get(authenticate, UserController.getOneUser)
    .put(authenticate, UserController.editUser)
    .delete(authenticate, UserController.deleteUser);

router.route('/')
    .get(authenticate, UserController.getAllUsers);

module.exports = router;