import React from 'react';
import { getAllProducts } from '../contract';
import { useProductContext } from '../context/ProductContext';

const ViewProducts = () => {
  const { products, setProducts, setError, loading, setLoading } = useProductContext();

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

  return (
    <div>
      <h2>View Products</h2>
      <button onClick={handleGetAllProducts} disabled={loading}>
        {loading ? "Loading..." : "Get All Products"}
      </button>
      {products.length > 0 && (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              ID: {product.id}, Name: {product.name}, Status: {product.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewProducts;