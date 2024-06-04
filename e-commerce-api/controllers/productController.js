const productService = require('../services/productService');

const getTopProducts = async (req, res) => {
    const { categoryname } = req.params;
    const n = parseInt(req.query.n) || 10;
    const page = parseInt(req.query.page) || 1;
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 100000;
    const sortBy = req.query.sort_by || 'price';
    const order = req.query.order || 'asc';

    try {
        const products = await productService.getTopProducts(categoryname, n, page, minPrice, maxPrice, sortBy, order);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductDetails = async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const product = await productService.getProductDetails(categoryname, productid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTopProducts,
    getProductDetails,
};
