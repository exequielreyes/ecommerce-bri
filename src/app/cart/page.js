"use client";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../api/payment";

import CartItems from "./components/CartItems";// Asegúrate de tener este componente creado
import CartSummary from "./components/CartSummary";// Asegúrate de tener este componente creado
import ProgressSteps from "./components/ProgressSteps"; // Asegúrate de tener este componente creado
import { useLovedProducts } from "@/context/UseLovedProducts";


const Cart = () => {
  const { cart, removeFromCart, updateQuantity,  } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts(); 
  const [postalCode, setPostalCode] = useState("");
  const router = useRouter();
   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

  const handleGoBack = () => router.back();

    // Manejar el cambio de cantidad
    const handleQuantityChange = (id, quantity) => { 
      if (quantity >= 1 && quantity <= 10) { 
        updateQuantity(id, quantity); 
      }
    }

  const BuyStripe = async (cart, product = null) => { // Cambia aquí para aceptar el carrito como argumento
    try {
        const stripe = await stripePromise;
        const productsToCheckout = product ? [product] : cart; // Usa el producto si se pasa, de lo contrario usa el carrito
        const res = await makePaymentRequest.post("/api/orders", { products: productsToCheckout });
        await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
    } catch (error) {
        console.error("Error al redirigir a Stripe Checkout", error);
    }
};

  const calculateTotal = () => cart.reduce((total, product) => total + product.attributes.price * product.quantity, 0);

  

  const handlePostalCodeChange = (e) => setPostalCode(e.target.value);

  return (
    <div className="container mx-auto p-4">
      {cart.length > 0 && (
        <div className="mb-4">
          <button onClick={handleGoBack} className="flex items-center text-black hover:text-purple-700">
            <ChevronLeft className="w-6 h-6" /> Regresar
          </button>
        </div>
      )}

      <ProgressSteps currentStep={1} />

      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col md:flex-row">
          <CartItems 
            cart={cart} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity} 
            handleQuantityChange={handleQuantityChange}
            addLoveItem={addLoveItem} // Asegúrate de pasar la función aquí
          />
          <CartSummary 
            total={calculateTotal()} 
            postalCode={postalCode} 
            onPostalCodeChange={handlePostalCodeChange} 
            onCheckout={()=> BuyStripe(cart)} 
          />
        </div>
      )}
    </div>
  );
};

const EmptyCart = () => (
  <div>
    <div className="bg-white shadow-md rounded-lg p-4 mx-auto max-w-lg mb-6 text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">¡Tu carrito está vacío!</h2>
      <p>Echa un vistazo a nuestra nueva colección, seguro que encuentras lo que necesitas.</p>
      <Link href="/products">
        <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 focus:outline-none transition-all duration-300">
          Seguir comprando
        </button>
      </Link>
    </div>
  </div>
);

export default Cart;




















































//CODIGO FUNCIONANDO
// /* eslint-disable @next/next/no-img-element */

// "use client";
// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "../../context/CartContext";
// import Link from "next/link";
// import { FaTrash, FaHeart, FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { ChevronLeft } from "lucide-react";
// import { IconButton } from "@mui/material";
// import { useLovedProducts } from "@/context/UseLovedProducts";
// import { loadStripe } from "@stripe/stripe-js";
// import { makePaymentRequest } from "../api/payment";

// const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity, removeAll } = useContext(CartContext);
//   const [postalCode, setPostalCode] = useState("");
//   const router = useRouter();
//   const { addLoveItem } = useLovedProducts(); 
//   const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

//   const handleGoBack = () => router.back();

//   const buyStripe = async () => {
//     try {
//       const stripe = await stripePromise;
//       const res = await makePaymentRequest.post("/api/orders", { products: cart });
//       await stripe?.redirectToCheckout({ sessionId: res.data.stripeSession.id });
//     } catch (error) {
//       console.error("Error al redirigir a Stripe Checkout", error);
//     }
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, product) => total + product.attributes.price * product.quantity, 0);
//   };

//   const handleQuantityChange = (id, quantity) => {
//     if (quantity >= 1 && quantity <= 10) {
//       updateQuantity(id, quantity);
//     }
//   };

//   const handlePostalCodeChange = (e) => setPostalCode(e.target.value);
//   const handlePostalCodeSubmit = () => alert(`Cálculo de envío para el código postal: ${postalCode}`);

//   return (
//     <div className="container mx-auto p-4">
//       {cart.length > 0 && (
//         <div className="mb-4">
//           <button onClick={handleGoBack} className="flex items-center text-black hover:text-purple-700">
//             <ChevronLeft className="w-6 h-6" /> Regresar
//           </button>
//         </div>
//       )}

//       <ProgressSteps currentStep={1} />

//       {cart.length === 0 ? (
//         <EmptyCart />
//       ) : (
//         <div className="flex flex-col md:flex-row">
//           <CartItems 
//             cart={cart} 
//             removeFromCart={removeFromCart} 
//             addLoveItem={addLoveItem} 
//             handleQuantityChange={handleQuantityChange} 
//           />
//           <CartSummary 
//             total={calculateTotal()} 
//             postalCode={postalCode} 
//             onPostalCodeChange={handlePostalCodeChange} 
//             onPostalCodeSubmit={handlePostalCodeSubmit} 
//             onCheckout={buyStripe} 
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const ProgressSteps = ({ currentStep }) => {
//   const getStepClass = (step) => (
//     step === currentStep ? "bg-purple-500 text-white" : "bg-gray-300 text-white"
//   );

//   return (
//     <div className="flex justify-center space-x-6 mt-6 mb-4">
//       {[1, 2, 3].map(step => (
//         <div key={step} className="flex flex-col items-center">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStepClass(step)}`}>
//             {step}
//           </div>
//           <span className="mt-2 text-sm font-medium text-gray-700">{step === 1 ? 'Carrito' : step === 2 ? 'Envío' : 'Pago'}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// const EmptyCart = () => (
//   <div>
//     <div className="bg-white shadow-md rounded-lg p-4 mx-auto max-w-lg mb-6 text-center mt-10">
//       <h2 className="text-2xl font-semibold mb-4">¡Tu carrito está vacío!</h2>
//       <p>Echa un vistazo a nuestra nueva colección, seguro que encuentras lo que necesitas.</p>
//       <Link href="/products">
//         <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 focus:outline-none transition-all duration-300">
//           Seguir comprando
//         </button>
//       </Link>
//     </div>

//   </div>
// );

// const CartItems = ({ cart, removeFromCart, addLoveItem, handleQuantityChange }) => (
//   <div className="md:w-2/3 pr-4">
//     {cart.map(product => {
//       const imageUrl = product.attributes?.images?.data?.[0]?.attributes?.url
//         ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
//         : '/default-image.jpg';

//       return (
//         <div key={product.id} className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-md hover:shadow-lg rounded-lg mb-4 p-6 flex items-center justify-between transition-transform transform hover:scale-104 ">
//           <img src={imageUrl} alt={product.attributes.productName || "Sin título"} className="w-24 h-24 object-contain rounded-md border border-gray-200" />
//           <div className="ml-6 flex-grow">
//             <h5 className="text-lg font-semibold mb-2 text-gray-800">{product.attributes?.productName || "Nombre no disponible"}</h5>
//             <p className="text-green-600 font-semibold mb-2">${product.attributes?.price?.toFixed(2) || "Precio no disponible"}</p>
//             <QuantitySelector 
//               quantity={product.quantity} 
//               onIncrease={() => handleQuantityChange(product.id, product.quantity + 1)} 
//               onDecrease={() => handleQuantityChange(product.id, product.quantity - 1)} 
//             />
//             <p className="text-gray-800 font-semibold mt-4">
//               Subtotal: ${product.attributes?.price ? (product.attributes.price * product.quantity).toFixed(2) : "N/A"}
//             </p>
//           </div>
//           <div className="ml-6 flex flex-col space-y-4 items-center">
//             <IconButton className="text-gray-600 hover:text-red-500 transition-colors" onClick={() => removeFromCart(product.id)}>
//               <FaTrash size={20} />
//             </IconButton>
//             <IconButton className="text-gray-600 hover:text-pink-500 transition-colors" onClick={() => addLoveItem(product)}>
//               <FaHeart size={20} />
//             </IconButton>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// );

// const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
//   <div className="flex items-center space-x-2">
//     <button className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors" onClick={onDecrease}>
//       <FaMinus size={10} />
//     </button>
//     <span className="text-sm font-semibold text-gray-700">{quantity}</span>
//     <button className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors" onClick={onIncrease}>
//       <FaPlus size={10} />
//     </button>
//   </div>
// );

// const CartSummary = ({ total, postalCode, onPostalCodeChange, onPostalCodeSubmit, onCheckout }) => (
//   <div className="md:w-1/3">
//     <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
//       <h4 className="text-xl font-semibold mb-4">RESUMEN DE COMPRA</h4>
//       <div className="flex items-center justify-between relative">
//         <p className="text-gray-600 mr-2">Subtotal</p>
//         <div className="group relative flex items-center">
//           <FaQuestionCircle size={16} className="text-white-500 cursor-pointer hover:text-gray-600" />
//           <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex w-64 bg-gray-800 text-white text-xs rounded p-2 shadow-lg z-10">
//             El subtotal refleja el importe total de su pedido, no incluye los gastos del envío.
//           </div>
//         </div>
//         <span className="text-lg font-semibold text-gray-800 ml-auto">${total.toFixed(2)}</span>
//       </div>
//       <div className="flex items-center space-x-3 mt-4">
//         <div className="flex-grow">
//           <label htmlFor="postalCode" className="text-gray-600 mb-1 block">Código Postal:</label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               id="postalCode"
//               value={postalCode}
//               onChange={onPostalCodeChange}
//               className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
//               placeholder="Ingresa tu código postal"
//             />
//             <button
//               onClick={onPostalCodeSubmit}
//               className="bg-purple-500 text-white px-4 py-2 ml-2 rounded hover:bg-purple-600 transition-colors duration-300"
//             >
//               Calcular
//             </button>
//           </div>
//         </div>
//       </div>
//       <p className="text-lg font-semibold text-gray-800">
//         Total: <span className="font-bold ml-auto text-right">${total.toFixed(2)}</span>
//       </p>
//       <button 
//         className="bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 transition-colors duration-300"
//         onClick={onCheckout}
//       >
//         Continuar compra
//       </button>
//     </div>
//   </div>
// );

// export default Cart;

































