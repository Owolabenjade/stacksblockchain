// src/components/UpdateStatus.js

import React, { useState } from 'react';
import { updateProductStatus } from '../contract';
import InputField from './InputField';
import { useProductContext } from '../context/ProductContext';

const UpdateStatus = () => {
  const { setError, setLoading } = useProductContext();
  const [productId, setProductId] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleUpdateStatus = async () => {
    if (!productId || !newStatus) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      await updateProductStatus(productId, newStatus);
      setError('');
    } catch (error) {
      setError("Error updating status: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Product Status</h2>
      <InputField
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        ariaLabel="Product ID"
      />
      <InputField
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        placeholder="New Status"
        ariaLabel="New Product Status"
      />
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
};

export default UpdateStatus;