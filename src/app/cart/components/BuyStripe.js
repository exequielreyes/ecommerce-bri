import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/app/api/payment";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
const BuyStripe = async (product = null) => {
      try {
        const stripe = await stripePromise;
        const productsToCheckout = product ? [product] : cart;
        const res = await makePaymentRequest.post("/api/orders", { products: productsToCheckout });
        await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
      } catch (error) {
        console.error("Error al redirigir a Stripe Checkout", error);
      }
    };

export default BuyStripe
