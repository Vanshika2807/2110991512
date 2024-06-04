import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="App">
      <h1>Top Products</h1>
      <div className="container">
        <ProductList onProductSelect={handleProductSelect} />
        {selectedProduct && (
          <ProductDetails productId={selectedProduct.id} />
        )}
      </div>
    </div>
  );
}

export default App;
