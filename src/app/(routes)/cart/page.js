"use client";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Link from "next/link";
import { FaTrash, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { IconButton, Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../api/payment";
import { formatPrice } from "../../../../lib/formatPrice";
import CartItems from "./components/CartItems";// Asegúrate de tener este componente creado
import CartSummary from "./components/CartSummary";// Asegúrate de tener este componente creado
import ProgressSteps from "./components/ProgressSteps"; // Asegúrate de tener este componente creado
import { useLovedProducts } from "@/context/UseLovedProducts";


const Cart = () => {
  const { cart, removeFromCart, updateQuantity, updateSize, removeAll } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts();
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const router = useRouter();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

  // const handleGoBack = () => router.back();

  const handleQuantityChange = (id, size, quantity, availableStock) => {
    if (quantity >= 1 && quantity <= availableStock) {
      updateQuantity(id, size, quantity);
    }
  }



  const BuyStripe = async (cart, product = null) => { // Cambia aquí para aceptar el carrito como argumento
    try {
      const stripe = await stripePromise;
      const productsToCheckout = product ? [product] : cart; // Usa el producto si se pasa, de lo contrario usa el carrito
      const res = await makePaymentRequest.post("/api/orders", { products: productsToCheckout });
      const { error } = await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
      if (!error) {

        removeAll();
      } else {
        console.error("Error en Stripe Checkout", error)
      }
    } catch (error) {
      console.error("Error al redirigir a Stripe Checkout", error);
    }
  };

  // const calculateTotal = () => cart.reduce((total, product) => total + product.attributes.price * product.quantity, 0);
  const calculateTotal = () => {
    const total = cart.reduce((total, product) => {
      const price = product.attributes.price || 0;
      const discount = product.attributes.discount || 0;
      const quantity = product.quantity || 0;

     
      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;

      return total + (finalPrice * quantity);
    }, 0);
    return total;
  };


  //calcular envio mediante codigo postal
  const postalCodes = {
    "5300": 1000,
    "5000": 3000,
    "1400": 2000
    // Agrega más códigos postales y sus costos
  };

  const calculateShippingCost = (postalCode) => {
    // Aquí puedes usar tu lógica para determinar el costo
    // Si el código postal existe en postalCodes, establece el costo; de lo contrario, 0
    return postalCodes[postalCode] || 0;
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };


  // const handlePostalCodeChange = (e) => setPostalCode(e.target.value);
  const handlePostalCodeSubmit = () => {
    const cost = calculateShippingCost(postalCode);
    setShippingCost(cost);
  };

const cartItemsCount = cart.length;

  return (
    <div className="container mx-auto p-4">



      <div>
        {cart.length > 0 && (
          <div className="mb-4">
            {/* <button onClick={handleGoBack} className="flex items-center text-black hover:text-purple-700">
            <ChevronLeft className="w-6 h-6" /> Regresar
          </button> */}
            <ol className="flex items-center gap-1 text-sm text-gray-600">
              <li>
                <button onClick={() => router.back()} className="block transition hover:text-blue-500">
                  <span className="sr-only">Home</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>
              </li>

              <li class="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <h1 class="block transition text-black hover:text-gray-700 text-2xl text-center">
                  Mi Carrito <span className="text-sm text-gray-500">({cartItemsCount})</span>
                </h1>
              </li>

            </ol>


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
              updateSize={updateSize}
              addLoveItem={addLoveItem} // Asegúrate de pasar la función aquí

            />
            <CartSummary
              total={calculateTotal()}
              postalCode={postalCode}
              onPostalCodeChange={handlePostalCodeChange}
              onPostalCodeSubmit={handlePostalCodeSubmit}

              shippingCost={shippingCost} // Asegúrate de pasar el costo de envío
              onCheckout={() => BuyStripe(cart)}

            />
          </div>
        )}
      </div>
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