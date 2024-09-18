"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Comprobar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar el carrito desde localStorage cuando estamos en el cliente
  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [isClient]);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  


  //Este funciona
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const existingProductIndex = prevCart.findIndex(p => p.id === product.id);
  //     if (existingProductIndex > -1) {
  //       const updatedCart = [...prevCart];
  //       updatedCart[existingProductIndex].quantity += 1;
  //       return updatedCart;
  //     } else {
  //       const newProduct = { ...product, quantity: 1, price: product.price || 0 };
  //       return [...prevCart, newProduct];
  //     }
  //   });
  // };
  

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(p => p.id === product.id);
      
      if (existingProductIndex > -1) {
        // Actualizar cantidad
        const updatedCart = prevCart.map((item, index) => 
          index === existingProductIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        return updatedCart;
      } else {
        // Agregar nuevo producto
        const newProduct = { ...product, id: product.id || uuidv4(), quantity: 1, price: product.price || 0 };
        return [...prevCart, newProduct];
      }
    });
  };











  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(product =>
        product.id === productId
          ? { ...product, quantity: parseInt(quantity, 10) }
          : product
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

