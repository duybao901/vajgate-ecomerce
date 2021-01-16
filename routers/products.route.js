const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router
    .route('/products')
    .get(productsController.getProducts)
    .post(productsController.createProduct);

router
    .route('/products/:id', auth, authAdmin)
    .delete(productsController.deleteProduct)
    .put(productsController.updateProduct);

module.exports = router;
