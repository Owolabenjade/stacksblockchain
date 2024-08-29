import React, { useState } from 'react';
import { addProduct } from '../contract';
import InputField from './InputField';
import { useProductContext } from '../context/ProductContext';

const AddProduct = () => {
  const { setProducts, setError, setSuccess, setLoading } = useProductContext();
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('');

  const handleAddProduct = async () => {
    if (!productId || !productName || !status) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await addProduct(productId, productName, status);
      setProducts((prev) => [...prev, { id: productId, name: productName, status }]);
      setError('');
    } catch (error) {
      setError("Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <InputField
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
      />
      <InputField
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
      />
      <InputField
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;