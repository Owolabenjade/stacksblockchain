// src/App.js

import React, { Suspense, lazy } from 'react';
import AddProduct from './components/AddProduct';
import UpdateStatus from './components/UpdateStatus';
import ViewProducts from './components/ViewProducts';

const LazyDeleteProduct = lazy(() => import('./components/DeleteProduct'));

function App() {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Decentralized Supply Chain App</h1>
      <div className="row">
        <div className="col-md-6">
          <AddProduct />
        </div>
        <div className="col-md-6">
          <UpdateStatus />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <ViewProducts />
        </div>
        <div className="col-md-6">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyDeleteProduct />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;