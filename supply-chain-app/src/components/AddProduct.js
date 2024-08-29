// src/components/AddProduct.js

import React, { useState } from 'react';
import { addProduct } from '../contract';

const AddProduct = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    // Form validation
    if (!productId || !productName || !status) {
      setError("All fields are required.");
      setSuccess('');
      return;
    }

    setLoading(true);
    try {
      const result = await addProduct(productId, productName, status);
      setSuccess("Product added successfully!");
      setError('');
    } catch (error) {
      setError("Error adding product: " + error.message);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleAddProduct} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default AddProduct;