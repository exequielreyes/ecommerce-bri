/* eslint-disable @next/next/no-img-element */
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
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { FaTrash, FaHeart, FaPlus, FaMinus, FaQuestionCircle, FaTruck, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, toggleFavorite } = useContext(CartContext);
  const [postalCode, setPostalCode] = useState('');
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const currentStep = 1;

  const getStepClass = (step) => {
    return step === currentStep ? 'bg-purple-500 text-white' : 'bg-gray-300 text-white';
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1 && quantity <= 10) {
      updateQuantity(id, quantity);
    }
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handlePostalCodeSubmit = () => {
    alert(`Cálculo de envío para el código postal: ${postalCode}`);
  };

  return (
    <div className='container mx-auto p-4'>
      {/* Botón para regresar a la página anterior */}
      {cart.length > 0 && (
        <div className='mb-4'>
          <button 
            onClick={handleGoBack} 
            className='flex items-center text-black-500 hover:text-purple-700'
          >
            <FaArrowLeft className='text-lg mr-2' />
            Regresar
          </button>
        </div>
      )}

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

          {/* Tarjeta para ayuda */}
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
              <div key={product.id} className="bg-white shadow-lg rounded-lg mb-4 p-6 flex items-center">
                {/* Imagen del producto */}
                <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-md border border-gray-200"/>

                <div className="ml-6 flex-grow">
                  {/* Título del producto */}
                  <h5 className='text-lg font-semibold mb-2 text-gray-800'>{product.title}</h5>

                  {/* Precio del producto */}
                  <p className="text-gray-600 mb-2">Precio: ${(product.price).toFixed(2)}</p>

                  {/* Cantidad */}
                  <p className="text-sm font-semibold text-gray-700 mb-2">Cantidad:</p>

                  {/* Selector de cantidad con botones de más y menos en círculo */}
                  <div className="flex items-center space-x-2">
                    <button 
                      className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="text-sm font-semibold text-gray-700">{product.quantity}</span>
                    <button 
                      className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-gray-800 font-semibold mt-4">Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
                </div>

                {/* Botones de eliminar y favorito */}
                <div className="ml-6 flex flex-col space-y-2">
                  <button 
                    className='text-gray-600 hover:text-red-500 transition-colors' 
                    onClick={() => removeFromCart(product.id)}
                  >
                    <FaTrash size={14}/>
                  </button>
                  <button 
                    className='text-gray-600 hover:text-pink-500 transition-colors' 
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <FaHeart size={14}/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className='md:w-1/3'>
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
              <h4 className='text-xl font-semibold mb-4'>RESUMEN DE COMPRA</h4>

              {/* Subtotal con ícono de información */}
              <div className='flex items-center justify-between'>
                <p className='text-gray-600 '>Subtotal:</p>
                {/* <FaQuestionCircle 
                  size={16} 
                  className='text-gray-500 cursor-pointer hover:text-gray-600 mr-2' 
                  title="El subtotal refleja el importe total de su pedido, no incluye los gastos del envío."
                /> */}
                <span className='text-lg font-semibold text-gray-800 ml-auto'>${calculateTotal().toFixed(2)}</span>
              </div>

              {/* Input de código postal */}
              <div className='flex items-center space-x-3 mt-4'>
                <div className='flex-grow'>
                  <label htmlFor='postalCode' className='text-gray-600 mb-1 block'>Código Postal:</label>
                  <div className='flex items-center'>
                    <input 
                      type='text' 
                      id='postalCode' 
                      value={postalCode} 
                      onChange={handlePostalCodeChange} 
                      className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 placeholder-gray-500'
                      placeholder='Ingresa tu código postal'
                    />
                    <button 
                      onClick={handlePostalCodeSubmit} 
                      className='bg-purple-500 text-white px-4 py-2 ml-2 rounded hover:bg-purple-600 transition-colors duration-300'>
                      Calcular
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <p className='text-lg font-semibold text-gray-800'>Total: <span className='font-bold ml-auto text-right'>${calculateTotal().toFixed(2)}</span></p>
              <button className='bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 transition-colors duration-300'>
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