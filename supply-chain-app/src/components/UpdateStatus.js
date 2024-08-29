import React, { useState } from 'react';
import { updateProductStatus } from '../contract';

const UpdateStatus = () => {
  const [productId, setProductId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    // Form validation
    if (!productId || !newStatus) {
      setError("Both fields are required.");
      setSuccess('');
      return;
    }

    setLoading(true);
    try {
      const result = await updateProductStatus(productId, newStatus);
      setSuccess("Status updated successfully!");
      setError('');
    } catch (error) {
      setError("Error updating status: " + error.message);
      setSuccess('');
    } finally {
      setLoading(false);
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
      <button onClick={handleUpdateStatus} disabled={loading}>
        {loading ? "Updating..." : "Update Status"}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default UpdateStatus;