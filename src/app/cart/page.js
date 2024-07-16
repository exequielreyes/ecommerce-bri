"use client";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center mb-4'>Carrito de prueba</h1>
      {cart.length === 0 ? (
        <p className='text-center'>¡Empezá un carrito de compras!</p>
      ) : (
        <div className='list-group'>
          {cart.map((product) => (
            <div key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className='mb-1'>{product.title}</h5>
                <p className='mb-1'>{product.description}</p>
                <p className='mb-1'>${product.price}</p>
              </div>
              <button 
                className='btn btn-danger w-25 d-block d-sm-inline' 
                onClick={() => removeFromCart(product.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
