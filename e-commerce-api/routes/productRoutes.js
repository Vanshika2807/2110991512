const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/categories/:categoryname/products', productController.getTopProducts);
router.get('/categories/:categoryname/products/:productid', productController.getProductDetails);

module.exports = router;
