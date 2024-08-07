"use client";

/*import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductPageClient = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2">
      <span className="h4">${product.price}</span>
      <button 
        className="btn btn-primary w-25 d-block d-sm-inline" 
        onClick={() => addToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductPageClient;*/ //No borrar este codigo

import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ShoppingCart } from 'lucide-react';

const ProductPageClient = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false); // Estado para controlar el feedback visual
  const { isSignedIn } = useUser();
  const router = useRouter()


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
  const handleBuyNow = () => {
    if (!isSignedIn) {
      router.push('/login');
      return;
    };
  };

  return (
    //descomentar si no funciona el otro codigo
    // <div className="flex items-center justify-between px-6 pt-4 pb-2">
    //   <span className="h4">${product.price}</span>
    //   <button 
    //     className={`btn ${added ? 'btn-success' : 'btn-secondary'} text-sm`}
    //     style={{ minWidth: '120px' }} 
    //     onClick={handleAddToCart}
    //     disabled={added} // Deshabilitar el botón si ya se ha añadido
    //   >
    //     {added ? 'Añadido' : 'Añadir al carrito'}
    //   </button>
    //   <button 
    //     className="btn btn-secondary ml-3 text-sm " 
    //     style={{ minWidth: '120px' }}
    //     onClick={handleBuyNow}
    //     >
    //     Comprar
    //   </button>
    // </div>


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
    </Box>
  );
};

export default ProductPageClient;
