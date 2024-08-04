"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { fireStore } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  borderRadius: 2,
};

interface InventoryItem {
  name: string;
  quantity: number;
}

export default function Home() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState<number | string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showNotification = (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => {
    setNotification({ open: true, message, severity });
  };

  const updateInventory = async () => {
    setLoading(true);
    const snapshot = query(collection(fireStore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: InventoryItem[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...(doc.data() as InventoryItem) });
    });
    setInventory(inventoryList);
    setLoading(false);
  };

  const addItem = async (item: string, quantity: number) => {
    const docRef = doc(collection(fireStore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { quantity });
      showNotification("Item updated successfully!", "success");
    } else {
      await setDoc(docRef, { quantity });
      showNotification("Item added successfully!", "success");
    }
    await updateInventory();
  };

  const decreaseItemQuantity = async (item: string) => {
    const docRef = doc(collection(fireStore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data() as InventoryItem;
      if (quantity > 1) {
        await setDoc(docRef, { quantity: quantity - 1 });
        showNotification("Item quantity decreased!", "success");
      } else {
        showNotification("Quantity can't be less than 1. Use Remove to delete the item.", "warning");
      }
    }
    await updateInventory();
  };

  const removeItem = async (item: string) => {
    const docRef = doc(collection(fireStore, "inventory"), item);
    await deleteDoc(docRef);
    showNotification("Item removed successfully!", "success");
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateInventory();
  }, []);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      bgcolor={"#f7f7f7"}
      padding={2}
    >
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add or Update Item
          </Typography>
          <Stack width="100%" direction={"column"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="outlined-quantity"
              label="Quantity"
              variant="outlined"
              fullWidth
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (itemName && itemQuantity) {
                  addItem(itemName, Number(itemQuantity));
                  setItemName("");
                  setItemQuantity("");
                  handleClose();
                }
              }}
            >
              Add/Update
            </Button>
          </Stack>
        </Box>
      </Modal>
      <TextField
        id="search-bar"
        label="Search"
        variant="outlined"
        width="100vw"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add or Update Item
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box borderRadius={2} overflow={"hidden"} boxShadow={3} bgcolor={"white"}>
          <Box
            width="800px"
            height="100px"
            bgcolor={"#3f51b5"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant={"h4"} color={"white"} textAlign={"center"}>
              Inventory Items
            </Typography>
          </Box>
          <Stack width="800px" height="300px" spacing={2} overflow={"auto"} padding={2}>
            {filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="80px"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#e0e0e0"}
                borderRadius={1}
                padding={2}
              >
                <Typography variant={"h6"} color={"#333"}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={"h6"} color={"#333"}>
                  Quantity: {quantity}
                </Typography>
                <Box display={"flex"} gap={1}>
                  <IconButton color="primary" onClick={() => addItem(name, quantity + 1)}>
                    <Add />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => decreaseItemQuantity(name)}>
                    <Remove />
                  </IconButton>
                  <IconButton color="error" onClick={() => removeItem(name)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
