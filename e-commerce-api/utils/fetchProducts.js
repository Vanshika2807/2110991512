const axios = require('axios');
const E_COMMERCE_API_BASE_URL = "http://20.244.56.144/test/companies";

const fetchProducts = async (company, category, minPrice, maxPrice, topN) => {
    try {
        const url = `${E_COMMERCE_API_BASE_URL}/${company}/categories/${category}/products/top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products from ${company}:`, error);
        return [];
    }
};

module.exports = fetchProducts;
