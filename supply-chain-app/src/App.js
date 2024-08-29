import React from 'react';
import AddProduct from './components/AddProduct';
import UpdateStatus from './components/UpdateStatus';
import ViewProducts from './components/ViewProducts';
import DeleteProduct from './components/DeleteProduct';

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
          <DeleteProduct />
        </div>
      </div>
    </div>
  );
}

export default App;