"use client";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/app/api/payment";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../api/GlobalApi"
import Image from "next/image";
import { formatPrice } from "../../../../lib/formatPrice";
import axios from 'axios';
import {  Wallet,initMercadoPago } from "@mercadopago/sdk-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, {
  locale: "es-AR",
});

const CheckoutPage = () => {
  const { cart, removeAll } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMercadoPago, setIsLoadingMercadoPago] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const router = useRouter();
  const { isSignedIn  } = useUser();
 




  ////esto funciona Función para redirigir a la pasarela de Stripe funcion
//    const handleStripePayment = async () => {
//      setIsLoading(true);
//     try {
//       const stripe = await stripePromise;
//       const res = await makePaymentRequest.post("/api/orders", { products: cart });
//       const { error } = await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });

//       if (error) {
//         console.error("Error en Stripe Checkout", error);
//       }
//     } catch (error) {
//       console.error("Error al redirigir a Stripe Checkout", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


const handleStripePayment = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;

      // Calcular el total con descuento
      const productsWithDiscount = cart.map((item) => {
        const price = item.attributes.price || 0;
        const discount = item.attributes.discount || 0;
        const discountAmount = price * (discount / 100);
        const finalPrice = price - discountAmount;

        return {
          ...item,
          finalPrice: finalPrice, // Agregar el precio final al producto
          quantity: item.quantity,
        };
      });

      const totalAmount = productsWithDiscount.reduce((total, item) => {
        return total + item.finalPrice * item.quantity;
      }, 0);

      const res = await makePaymentRequest.post("/api/orders", {
        products: productsWithDiscount,
        totalAmount: totalAmount, // Enviar el total calculado
      });

      const { error } = await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });

      if (error) {
        console.error("Error en Stripe Checkout", error);
      }
    } catch (error) {
      console.error("Error al redirigir a Stripe Checkout", error);
    } finally {
      setIsLoading(false);
    }
  };



////esto hacerlo a futuro
//   const handleStripePayment = async () => {
//     setIsLoading(true);
//     try {
//       const stripe = await stripePromise;
      
//       // Crear la orden en Strapi
//       const orderResponse = await makePaymentRequest.post("/api/orders", {
//         products: cart,
//         totalAmount: cart.reduce((total, item) => total + item.attributes.price * item.quantity, 0),
//         customerEmail: user?.primaryEmailAddress?.emailAddress || 'sin-email@ejemplo.com',
//         status: 'pending'
//       });
  
//       const { id: orderId } = orderResponse.data; // Obtener el ID de la orden creada
  
//       // Redirigir a Stripe Checkout
//       const res = await makePaymentRequest.post("/api/orders", { products: cart });
//       const { error } = await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
  
//       if (!error) {
//         // Actualizar el estado de la orden a 'paid'
//         await makePaymentRequest.put(`/api/orders/${orderId}`, {
//           status: "paid",
//           stripeId: res.data.stripeSession.id,
//         });
  
//         removeAll(); // Limpiar carrito si el pago es exitoso
//       } else {
//         console.error("Error en Stripe Checkout", error);
//       }
//     } catch (error) {
//       console.error("Error al redirigir a Stripe Checkout", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const createOrder=()=>{
//     let productIds=[];
//     cart.forEach(element => {
//       productIds.push(element?.product?.id)
//     });
//     const data={
//       data:{
//         email: user.primaryEmailAddress.emailAddress,
//         userName: user.fullName,
//         amount: amount,
//         products:productIds
//       }
//     }
//     GlobalApi.createOrder(data).then(resp=>{
//       if(resp){
//         cart.forEach(element => {
//           GlobalApi.deleteCartItems(element.id).then(result=>{
//           })
//         });
//       }
//     })
//   }


const createPreference = async () => {
  try {
    const products = cart.map(item => {
      const price = item.attributes.price || 0;
      const discount = item.attributes.discount || 0;
      const discountAmount = price * (discount / 100);
      const finalPrice = price - discountAmount;

      return {
        title: item.attributes.name,
        quantity: item.quantity,
        price: finalPrice, // Usar el precio final aquí
        image: item.attributes.images.data[0].attributes.url
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.attributes.images.data[0].attributes.url}`
          : "/default-image.jpg",
      };
    });

    const response = await axios.post("/api/create_preference", {
      items: products,
    });

    console.log("Response from server:", response.data);
    const { id } = response.data;
    setPreferenceId(id);
    return id;
  } catch (error) {
    console.error("Error creating preference:", error);
  }
};

const handlePayWithMercadoPago = async () => {
  if (!isSignedIn) {
    router.push("/sign-in");
    return;
  }

  setIsLoadingMercadoPago(true);
  const id = await createPreference();
  if (id) {
    window.open(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`, "_blank");
  }
  setIsLoadingMercadoPago(false);
};

  return (
    <>
    <div className="flex flex-col items-center">
      <div className="max-w-xl w-full p-4">
        <h2 className="sr-only">Steps</h2>
        <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
          <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
            <li className="flex items-center gap-2 bg-white p-2">
              <span className="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"> 1 </span>
              <span className="hidden sm:block"> Carrito </span>
            </li>
            <li className="flex items-center gap-2 bg-white p-2">
              <span className="size-6 rounded-full bg-blue-600 text-white text-center text-[10px]/6 font-bold"> 2 </span>
              <span className="hidden sm:block"> Pago </span>
            </li>
          </ol>
        </div>
        
      </div>
    </div>
    <div className="max-w-7xl mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">Resumen de la compra</h1>
    <div className="space-y-6">
      {cart.map((item) => {
        const imageUrl = item.attributes?.images?.data?.[0]?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.attributes.images.data[0].attributes.url}`
          : "/default-image.jpg";

          // Obtener el precio y el descuento
          const price = item.attributes.price || 0;
          const discount = item.attributes.discount || 0;
          const discountAmount = price * (discount / 100);
          const finalPrice = price - discountAmount;

        return (
          <div key={item.id} className="flex items-center bg-white rounded-lg shadow-md p-4">
            <Image
                src={imageUrl}
                alt={item.attributes.name || "Producto sin título"}
                width={80} 
                height={80} 
                className="object-contain rounded-md border border-gray-200"
            />
            <div className="ml-4 flex flex-col">
              <p className="text-lg font-semibold">{item.attributes.name}</p>
              <p className="text-sm">Cantidad: {item.quantity}</p>
                    <p className="text-sm font-semibold text-gray-700">Precio: {formatPrice(price)}</p>
                    {discount > 0 && (
                        <p className="text-sm text-red-500">
                            Descuento: {formatPrice(discountAmount)} ({discount}%)
                        </p>
                    )}
                    <p className="text-sm font-semibold text-gray-700">Precio Final: {formatPrice(finalPrice)}</p>
            </div>
          </div>
        );
      })}
    </div>
    <h2 className="mt-12 text-2xl font-semibold mb-4">Metodos de pago</h2>
  </div>
  <div className="max-w-xl mx-auto">
    <button
      onClick={handleStripePayment}
      className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600 transition "
      disabled={isLoading}
    >
      {isLoading ? "Procesando..." : "Pagar con Stripe"}
    </button>
    <button
          onClick={handlePayWithMercadoPago}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full hover:bg-blue-600 transition"
          disabled={isLoadingMercadoPago}
        >
          {isLoadingMercadoPago ? "Procesando..." : "Pagar con Mercado Pago"}
        </button>
        {/* {preferenceId && (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )} */}
    </div>
  </>
  );
};

export default CheckoutPage;