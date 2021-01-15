const express = require('express');
const paymentsController = require('../controllers/payments.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const Router = express.Router();

Router.route('/payment')
    .get(auth, authAdmin, paymentsController.getPayments)
    .post(auth, paymentsController.createPayment);

module.exports = Router;
