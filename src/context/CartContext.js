
"use client";
import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Definir el estado inicial
const initialState = {
  cart: [],
};

// Definir las acciones
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingProductIndex > -1) {
        // Si ya existe el producto con el mismo tamaño, incrementar la cantidad
        const updatedCart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        // Agregar un nuevo producto
        const newProduct = {
          ...action.payload,
          id: action.payload.id || uuidv4(),
          quantity: action.payload.quantity,
          price: action.payload.price || 0,
        };
        return { ...state, cart: [...state.cart, newProduct] };
      }
    }

    case 'REMOVE_FROM_CART':
      // Cambiar la lógica de eliminación para usar un ID único
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id || product.size !== action.payload.size),
      };

      case 'UPDATE_QUANTITY':
        const { id, size, quantity } = action.payload;
        console.log(`Actualizando cantidad para ID: ${id}, Tamaño: ${size}, Nueva cantidad: ${quantity}`);
      
        // Verifica que la cantidad esté dentro del rango permitido
        if (quantity < 1) return state; // No permitir cantidad menor a 1
      
        return {
          ...state,
          cart: state.cart.map(product =>
            product.id === id && product.size === size
              ? { ...product, quantity } // Actualiza solo la cantidad
              : product
          ),
        };


        case 'UPDATE_SIZE': {
          const { id, oldSize, newSize } = action.payload;
          return {
            ...state,
            cart: state.cart.map(product =>
              product.id === id && product.size === oldSize
                ? { ...product, size: newSize } // Actualiza el talle del producto
                : product
            ),
          };
        }


    case 'REMOVE_ALL':
      return { ...state, cart: [] };

      case 'LOAD_CART':
        return { ...state, cart: action.payload };

    default:
      return state;
  }
};

// Crear el contexto
export const CartContext = createContext();

// Crear el proveedor del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
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
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
      }
    }
  }, [isClient]);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  }, [state.cart, isClient]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const updateQuantity = (productId, size, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, size, quantity } });
  };

  const updateSize = (productId, oldSize, newSize) => {
    dispatch({ type: 'UPDATE_SIZE', payload: { id: productId, oldSize, newSize } });
  };

  const removeAll = () => {
    dispatch({ type: 'REMOVE_ALL' });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, updateQuantity, updateSize ,removeAll }}>
      {children}
    </CartContext.Provider>
  );
};
