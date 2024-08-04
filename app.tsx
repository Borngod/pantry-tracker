import React, { useState } from "react";


const App = () => {
  const [items, setItems] = useState([]);

  const handleItemDeleted = () => {
    console.log("Item deleted!");
  };

  return (
    <div>
      <p></p>
    </div>
  );
};

export default App;
