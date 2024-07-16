"use client";

/*import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductPageClient = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2">
      <span className="h4">${product.price}</span>
      <button 
        className="btn btn-primary w-25 d-block d-sm-inline" 
        onClick={() => addToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductPageClient;*/ //No borrar este codigo

import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPageClient = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false); // Estado para controlar el feedback visual

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true); // Marcar como añadido para cambiar el estilo del botón
    setTimeout(() => {
      setAdded(false); // Restablecer el estado después de un tiempo
    }, 1000); // Cambiar después de 1 segundo (ejemplo)
  };

  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2">
      <span className="h4">${product.price}</span>
      <button 
        className={`btn ${added ? 'btn-success' : 'btn-secondary'} w-25 d-block d-sm-inline`} 
        onClick={handleAddToCart}
        disabled={added} // Deshabilitar el botón si ya se ha añadido
      >
        {added ? 'Añadido' : 'Añadir al carrito'}
      </button>
    </div>
  );
};

export default ProductPageClient;
