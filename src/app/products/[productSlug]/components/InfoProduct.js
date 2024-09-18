import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Bold, Heart, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { formatPrice } from '../../../../../lib/formatPrice'; // Asegúrate de tener esta función
import { useLovedProducts } from '@/context/UseLovedProducts';

const InfoProduct = ({ product }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts();
  const [added, setAdded] = useState(false); // Estado para controlar el feedback visual
  const { isSignedIn } = useUser();
  const router = useRouter();

  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, { locale: 'es-AR' });

  // Función para crear la preferencia de pago
  const createPreference = async () => {
    try {
      console.log("Creating preference with:", {
        title: product.attributes.productName,
        quantity: 1,
        price: Number(product.attributes.price), // Asegúrate de convertir el precio a número
        image: product.attributes.images,
      });

      const response = await axios.post("/api/create_preference", {
        title: product.attributes.productName,
        quantity: 1,
        price: Number(product.attributes.price), // Convertir el precio a número
        image: product.attributes.image,
      });

      console.log('Response from server:', response.data);
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  // Añadir al carrito
  const handleAddToCart = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    addToCart(product);
    setAdded(true); // Cambiar el estado a "añadido"
    setTimeout(() => {
      setAdded(false); // Restablecer el estado después de un tiempo
    }, 1000); // 1 segundo como ejemplo
  };

  // Comprar ahora
  const handleBuyNow = async () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <Box>
      {/* Nombre del producto y origen */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3,  }}>
      
        <Typography variant="h5"    sx={{fontWeight:'bold'}}   >{product.attributes.productName}</Typography>
        {/* <Typography variant="body2">{`Origen: ${product.attributes.origin}, Sabor: ${product.attributes.taste}`}</Typography> */}
        <Heart 
          width={28} 
          strokeWidth={1} 
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => addLoveItem(product)}
          
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Descripción del producto */}
      <Typography variant="body1" sx={{ my: 2 }}>
        {product.attributes.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 4 }}>

      <Typography variant="h5" sx={{flexGrow: 1}}>
          {formatPrice(product.attributes.price)}
        </Typography>
        {/* <Heart 
          width={30} 
          strokeWidth={1} 
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => addLoveItem(product)}
        /> */}
        
      </Box>

      {/* Botones de "Añadir al carrito" y "Comprar" */}
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

      {/* MercadoPago Wallet */}
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{ texts: { valueProp: 'smart_option' } }}
        />
      )}
    </Box>
  );
};

export default InfoProduct;