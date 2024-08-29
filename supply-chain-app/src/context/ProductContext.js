import React, { createContext, useState, useContext } from 'react';

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <ProductContext.Provider value={{ products, setProducts, error, setError, loading, setLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook to use the ProductContext
export const useProductContext = () => {
  return useContext(ProductContext);
};