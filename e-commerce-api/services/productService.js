const cache = require('../config/cache');
const fetchProducts = require('../utils/fetchProducts');
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const getTopProducts = async (categoryname, n, page, minPrice, maxPrice, sortBy, order) => {
    const cacheKey = `${categoryname}_${n}_${page}_${minPrice}_${maxPrice}_${sortBy}_${order}`;
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
        return cachedResult;
    }

    let allProducts = [];
    for (const company of COMPANIES) {
        const companyProducts = await fetchProducts(company, categoryname, minPrice, maxPrice, n);
        allProducts = allProducts.concat(companyProducts.map(product => ({ ...product, company })));
    }

    allProducts.sort((a, b) => {
        if (order === 'asc') {
            return a[sortBy] - b[sortBy];
        } else {
            return b[sortBy] - a[sortBy];
        }
    });

    const start = (page - 1) * n;
    const end = start + n;
    const paginatedProducts = allProducts.slice(start, end);

    cache.set(cacheKey, paginatedProducts);
    return paginatedProducts;
};

const getProductDetails = async (categoryname, productid) => {
    const cacheKey = `${categoryname}_${productid}`;
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
        return cachedResult;
    }

    for (const company of COMPANIES) {
        const products = await fetchProducts(company, categoryname, 0, 100000, 100);
        const product = products.find(p => p.id === productid);
        if (product) {
            cache.set(cacheKey, product);
            return product;
        }
    }
    return null;
};

module.exports = {
    getTopProducts,
    getProductDetails,
};
