import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('default-category');
  const [n, setN] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, [category, n, page, sortBy, order]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/categories/${category}/products`, {
        params: { n, page, sort_by: sortBy, order }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <div>
        <label>
          Category:
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Number of Products:
          <input type="number" value={n} onChange={(e) => setN(e.target.value)} />
        </label>
        <label>
          Page:
          <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="company">Company</option>
            <option value="discount">Discount</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id} onClick={() => onProductSelect(product)}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;
