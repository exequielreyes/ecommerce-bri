/*"use client";
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

export default Cart;*/
"use client";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className='container mx-auto p-4'>
      {cart.length === 0 ? (
        <div className='text-center'><br></br>
          <h2 className='mb-4'>¡Empezá un carrito de compras!</h2>
          <Link href="/products">
            <button className='btn btn-primary'>Descubrir productos</button>
          </Link>
        </div>
      ) : (
        <div className='row'>
          <div className='col-md-8'>
            {cart.map((product) => (
              <div key={product.id} className="card mb-3">
                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
                  <img src={product.image} alt={product.title} className="img-thumbnail mb-3 mb-md-0" style={{ width: '100px' }} />
                  <div className="ml-3 flex-grow-1">
                    <h5 className='mb-1 font-weight-bold'>{product.title}</h5>
                    <p className='mb-1'>{product.description}</p>
                    <button 
                      className='btn btn-danger btn-sm mt-2' 
                      onClick={() => removeFromCart(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="text-right">
                    <b><p className='mb-1 font-weight-bold'>${product.price.toFixed(2)}</p></b>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4'>
            <div className="card">
              <div className="card-body">
                <h4 className='card-title'>Resumen de compra</h4>
                <p className='card-text'>Productos ({cart.length})</p>
                <p className='card-text'>Total: <span className='font-weight-bold'>${calculateTotal().toFixed(2)}</span></p>
                <button className='btn btn-primary w-100'>Continuar compra</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
