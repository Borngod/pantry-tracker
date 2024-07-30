tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import PantryItem from './PantryItem';

interface PantryItem {
  name: string;
  quantity: number;
}

const PantryForm = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItems([...items, { name, quantity }]);
    setName('');
    setQuantity(0);
  };

  return (
    <Box component="form">
      <TextField
        label="Item Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
      />
      <TextField
        label="Quantity"
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
        value={quantity}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuantity(Number(event.target.value))
        }
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        margin="normal"
        onClick={handleSubmit}
      >
        Add Item
      </Button>
      {items.map((item: PantryItem, index: number) => (
        <PantryItem key={index} item={item} />
      ))}
    </Box>
  );
};

export default PantryForm;
