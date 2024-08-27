/* eslint-disable @next/next/no-img-element */


"use client";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Estado para el paso actual
  const currentStep = 1; // Cambia este valor según el paso actual

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Función para determinar si un paso está activo
  const getStepClass = (step) => {
    return step === currentStep ? 'bg-purple-500 text-white' : 'bg-gray-300 text-white';
  };

  return (
    <div className='container mx-auto p-4'>
      {/* Círculos de progreso */}
      <div className="flex justify-center space-x-6 mt-6 mb-4">
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStepClass(1)}`}>
            1
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">Carrito</span>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStepClass(2)}`}>
            2
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">Envío</span>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStepClass(3)}`}>
            3
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">Pago</span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div>
          {/* Tarjeta para carrito vacío */}
          <div className='bg-white shadow-md rounded-lg p-4 mx-auto max-w-lg mb-6'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold mb-4'>¡Tu carrito está vacío!</h2>
              <p>Echa un vistazo a nuestra nueva colección, seguro que encuentras lo que necesitas.</p>
              <Link href="/products">
                <button className='bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300'>
                  Seguir comprando
                </button>
              </Link>
            </div>
          </div>

          {/* Tarjeta para ayuda*/}
          <div className='bg-white shadow-md rounded-lg p-4 mx-auto max-w-lg mb-6'>
            <div className='text-center'>
              <h3 className='text-lg font-semibold mb-4'>¿Necesitas ayuda?</h3>
              <Link href="/contact">
                <button className='bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300'>
                  Contacto
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-2/3 pr-4'>
            {cart.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg mb-4 p-4 flex items-center">
                
                {/* Imagen del producto */}
                <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-md"/>

                <div className="ml-4 flex-grow">
                  {/* Título del producto */}
                  <div className="flex justify-between items-center">
                    <h5 className='text-lg font-semibold mb-1'>{product.title}</h5>
                  </div>

                  {/* Precio del producto */}
                  <div className="flex items-center mb-2">
                    <span className="text-black-500 font-semibold text-lg">${(product.price*product.quantity).toFixed(2)}</span>
                  </div>

                  {/* Selector de cantidad */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700">Cantidad:</span>
                    <select 
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, e.target.value)}
                      className='border border-gray-300 rounded-md text-sm px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500'
                    >
                      {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Botón de eliminar centrado*/}
                <div className="ml-4 flex flex-col justify-center">
                  <button 
                    className='bg-red-500 text-white w-8 h-8 flex justify-center items-center rounded-full hover:bg-red-600 transition-colors' 
                    onClick={() => removeFromCart(product.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className='md:w-1/3'>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h4 className='text-xl font-semibold mb-2'>Resumen de compra</h4>
              <p className='text-gray-700 mb-2'>Productos ({cart.reduce((total,product) => total + product.quantity, 0)})</p>
              <p className='text-lg font-semibold'>Total: <span>${calculateTotal().toFixed(2)}</span></p>
              <button className='bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 transition-colors duration-300 mt-4'>
                Continuar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
