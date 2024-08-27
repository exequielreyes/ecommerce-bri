"use client";
import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { Box, Button, Divider, Typography } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

const ProductPageClient = ({ product }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false); // Estado para controlar el feedback visual
  const { isSignedIn } = useUser();
  const router = useRouter()

  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, { locale: 'es-AR' });



  const createPreference = async () => {
    try {
        const response = await axios.post("/api/create_preference", {
            title: product.title,
            quantity: 1,
            price: product.price,
            image: product.image,
        });
        const { id } = response.data;
        return id;
    } catch (error) {
        console.log(error);
    }
};





//carrito
  const handleAddToCart = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    addToCart(product);
    setAdded(true); // Marcar como añadido para cambiar el estilo del botón
    setTimeout(() => {
      setAdded(false); // Restablecer el estado después de un tiempo
    }, 1000); // Cambiar después de 1 segundo (ejemplo)
  };

  //compra
  const handleBuyNow = async () => {
    if (!isSignedIn) {
      router.push('/login');
      return;
    };
    const id = await createPreference();
    if(id){
      setPreferenceId(id)
    }
  };

  return (
  

    <Box >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button
            variant={added ? 'contained' : 'outlined'}
            color={added ? 'success' : 'primary'}
            onClick={handleAddToCart}
            disabled={added}
            startIcon={<ShoppingCart />}
            sx={{ flexGrow: 1 }}
          >
            {added ? 'Añadido' : 'Añadir al carrito'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBuyNow}
            sx={{ flexGrow: 1 }}
          >
            Comprar
          </Button>
        </Box>
      </Box>
      {preferenceId && (
                <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: 'smart_option' } }}
                />
            )}
    </Box>
  );
};

export default ProductPageClient;
