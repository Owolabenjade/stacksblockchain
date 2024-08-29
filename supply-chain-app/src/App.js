import React from 'react';
import AddProduct from './components/AddProduct';
import UpdateStatus from './components/UpdateStatus';
import ViewProducts from './components/ViewProducts';
import DeleteProduct from './components/DeleteProduct';

function App() {
  return (
    <div className="App">
      <h1>Decentralized Supply Chain App</h1>
      <AddProduct />
      <UpdateStatus />
      <ViewProducts />
      <DeleteProduct />
    </div>
  );
}

export default App;