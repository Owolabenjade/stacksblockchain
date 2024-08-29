import React, { useState } from 'react';
import { getAllProducts, getProduct } from '../contract';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);

  const handleGetAllProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleGetProduct = async () => {
    try {
      const result = await getProduct(productId);
      setProductDetails(result);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
      <h2>View Products</h2>
      <button onClick={handleGetAllProducts}>Get All Products</button>
      {products.length > 0 && (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              ID: {product.id}, Name: {product.name}, Status: {product.status}
            </li>
          ))}
        </ul>
      )}
      <h3>Get Product Details</h3>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleGetProduct}>Get Product</button>
      {productDetails && (
        <div>
          <h4>Product Details:</h4>
          <p>ID: {productDetails.id}</p>
          <p>Name: {productDetails.name}</p>
          <p>Status: {productDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;