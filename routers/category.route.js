const express = require('express');
const router = express.Router();
const categorysController = require('../controllers/categorys.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.get('/category', categorysController.getCategorys);
router.post('/category', auth, authAdmin, categorysController.createCategory);

router.delete(
    '/category/:id',
    auth,
    authAdmin,
    categorysController.deleteCategory,
);
router.put(
    '/category/:id',
    auth,
    authAdmin,
    categorysController.updateCategory,
);

module.exports = router;
