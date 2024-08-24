"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  
  
  // const addToCart = (product) => {
  //   const newProduct = { ...product, id: uuidv4() };
  //   setCart((prevCart) => [...prevCart, newProduct]);
  // };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(p => p.id === product.id);
      if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Si el producto no está en el carrito, añádelo con cantidad inicial de 1
        const newProduct = { ...product, id: uuidv4(), quantity: 1 };
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


