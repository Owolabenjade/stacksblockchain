import React, { useState } from 'react';
import { updateProductStatus } from '../contract';

const UpdateStatus = () => {
  const [productId, setProductId] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleUpdateStatus = async () => {
    try {
      const result = await updateProductStatus(productId, newStatus);
      console.log('Status updated:', result);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <h2>Update Product Status</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      />
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
};

export default UpdateStatus;