import React, { useState } from 'react';
import { getAllProducts, getProduct } from '../contract';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetAllProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (error) {
      setError("Error fetching products: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProduct = async () => {
    if (!productId) {
      setError("Product ID is required.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await getProduct(productId);
      setProductDetails(result);
    } catch (error) {
      setError("Error fetching product details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>View Products</h2>
      <button onClick={handleGetAllProducts} disabled={loading}>
        {loading ? "Loading..." : "Get All Products"}
      </button>
      {loading && <div>Loading products...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
      <button onClick={handleGetProduct} disabled={loading}>
        {loading ? "Loading..." : "Get Product"}
      </button>
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