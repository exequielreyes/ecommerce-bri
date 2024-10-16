
import React, { createContext, useContext, useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Crear el contexto
const LovedContext = createContext();

// Proveedor del contexto
export const UseLovedProductsProvider = ({ children }) => {
  const [lovedItems, setLovedItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Cargar los productos favoritos desde localStorage cuando la página se carga
  useEffect(() => {
    const storedLovedItems = localStorage.getItem('lovedItems');
    if (storedLovedItems) {
      setLovedItems(JSON.parse(storedLovedItems));
    }
  }, []);

  // Sincronizar localStorage con lovedItems al cambiar
  useEffect(() => {
    if(lovedItems.length > 0){
    localStorage.setItem('lovedItems', JSON.stringify(lovedItems));}
  }, [lovedItems]);


  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const addLoveItem = (data) => {
    const existingItem = lovedItems.find((item) => item.id === data.id);

    if (existingItem) {
      return setSnackbar({
        open: true,
        message: "El producto ya existe en la lista",
        severity: "error"
      });
    }

    setLovedItems([...lovedItems, data]);
    setSnackbar({
      open: true,
      message: "Producto añadido a la lista",
      severity: "success"
    });
  };

  const removeLovedItem = (id) => {
    setLovedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      if (updatedItems.length === 0) {
        localStorage.removeItem('lovedItems'); // Elimina el ítem de localStorage si no hay más productos
      } else {
        localStorage.setItem('lovedItems', JSON.stringify(updatedItems)); // Actualiza localStorage con los ítems restantes
      }
      return updatedItems;
    });

    setSnackbar({
      open: true,
      message: "El producto se ha eliminado de la lista",
      severity: "info"
    });
  };

  return (
    <LovedContext.Provider value={{ lovedItems, addLoveItem, removeLovedItem }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LovedContext.Provider>
  );
};

// Hook para usar el contexto
export const useLovedProducts = () => useContext(LovedContext);





