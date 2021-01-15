const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth');

router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.get('/logout', usersController.logout);

router.get('/infor', auth, usersController.infor);

router.patch('/addCart', auth, usersController.addCart);

router.get('/refresh_token', usersController.refreshToken);

router.get('/history', auth, usersController.history);

router.patch('/edit', auth, usersController.updateUser);
module.exports = router;
