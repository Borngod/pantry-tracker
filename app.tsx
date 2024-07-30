import React, { useState } from 'react';
import PantryForm from './PantryForm';
import PantryList from './PantryList';

const App = () => {
  const [items, setItems] = useState([]);

  const handleItemDeleted = () => {
    console.log('Item deleted!');
  };

  return (
    <div>
      <PantryForm />
      <PantryList onItemDeleted={handleItemDeleted} />
    </div>
  );
};

export default App;