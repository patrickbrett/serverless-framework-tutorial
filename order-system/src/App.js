import React, { useState } from 'react';
import './App.css';
import BasicTable from "./Table";
import axios from "axios";
import { ENDPOINT_URL } from "./constants";

function App() {
  const [newName, setNewName] = useState('');
  const [newOrder, setNewOrder] = useState('');
  const [loadRowsFunc, setLoadRowsFunc] = useState(null);

  const handleSubmit = async () => {
    await axios.post(ENDPOINT_URL, {
      name: newName,
      order: newOrder
    });

    setNewName('');
    setNewOrder('');

    console.log('curr', loadRowsFunc);
    loadRowsFunc && loadRowsFunc();
  }

  const loadRowsHook = (newLoadRowsFunc) => {
    console.log('new', newLoadRowsFunc);
    setLoadRowsFunc(() => newLoadRowsFunc);
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
        <input type="text" placeholder="Order" value={newOrder} onChange={e => setNewOrder(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <BasicTable loadRowsHook={loadRowsHook} />
    </div>
  );
}

export default App;
