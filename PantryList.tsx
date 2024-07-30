import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { getPantryItems, deletePantryItem } from './firebase';
import PantryForm from './PantryForm';
import PantryItem from './PantryItem';

interface PantryListProps {
  onItemDeleted: () => void;
}

const PantryList: React.FC<PantryListProps> = ({ onItemDeleted }) => {
  const [pantryItems, setPantryItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPantryItems = async () => {
      const items = await getPantryItems();
      setPantryItems(items);
    };
    fetchPantryItems();
  }, []);

  const handleDeleteItem = async (id: string) => {
    await deletePantryItem(id);
    onItemDeleted();
  };

  const handleEditItem = (id: string) => {
    setEditingItemId(id);
  };

  const handleSubmitEdit = () => {
    setEditingItemId(null);
  };

  const filteredItems = pantryItems.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
            <Button onClick={() => handleEditItem(item.id)}>Edit</Button>
            <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
            {editingItemId === item.id && (
              <PantryForm
                id={item.id}
                initialName={item.name}
                initialQuantity={item.quantity}
                initialExpirationDate={item.expirationDate}
                onSubmit={handleSubmitEdit}
              />
            )}
          </ListItem>
        ))}
        <ListItem>
          <PantryForm onSubmit={() => {}} />
        </ListItem>
      </List>
    </div>
  );
};

export default PantryList;