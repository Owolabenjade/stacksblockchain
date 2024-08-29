import React, { useState } from 'react';
import { deleteProduct } from '../contract';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(productId);
      console.log('Product deleted:', result);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleDeleteProduct}>Delete Product</button>
    </div>
  );
};

export default DeleteProduct;