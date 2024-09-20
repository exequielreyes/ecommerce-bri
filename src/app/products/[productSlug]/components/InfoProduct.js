import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { Bold, Calendar, CircleDollarSign, Heart, Info, ShoppingCart, Undo2 } from "lucide-react";
import axios from "axios";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { formatPrice } from "../../../../../lib/formatPrice"; // Asegúrate de tener esta función
import { useLovedProducts } from "@/context/UseLovedProducts";

const InfoProduct = ({ product }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts();
  const [added, setAdded] = useState(false); // Estado para controlar el feedback visual
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, {
    locale: "es-AR",
  });

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

      console.log("Response from server:", response.data);
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error creating preference:", error);
    }
  };

  // Añadir al carrito
  const handleAddToCart = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
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
      router.push("/sign-in");
      return;
    }
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };


  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box>
      {/* Nombre del producto y origen */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {product.attributes.productName}
        </Typography>
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 4 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
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
      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          variant={added ? "contained" : "outlined"}
          color={added ? "success" : "primary"}
          onClick={handleAddToCart}
          disabled={added}
          startIcon={<ShoppingCart />}
          sx={{ flexGrow: 1 }}
        >
          {added ? "Añadido" : "Añadir al carrito"}
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
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}

{/* Texto de devolución */}
<Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ color: "green", fontWeight: "bold"}}>
          Devolución gratis
        </Typography>
        <Typography variant="body2" >
           Tenés 30 días desde que lo recibís.
        </Typography>
        <Box>
        <Button
          variant="text"
          onClick={() => setOpenModal(true)}
          sx={{ pl:0}}
          style={{ marginTop: '-7px' }}
        >
          Conocer más
        </Button>
        </Box>
      </Box>

      {/* Modal de información */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: '550px',
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Información de devolución
          </Typography>
          <Typography variant="body2">
            Podés devolver este producto gratis. ¡No importa el motivo!
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box >
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
        <Calendar width={16} style={{ marginRight: 6 }}  /> Tenés 30 días desde que te llega.
      </Typography>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
        <Undo2 width={16} style={{ marginRight: 6 }} /> Podés enviarlo desde un correo o un punto de despacho cercano.
      </Typography>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleDollarSign width={16} style={{ marginRight: 6 }} /> Es importante que revises las políticas de devolución.
      </Typography>
    </Box>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>





    </Box>
  );
};

export default InfoProduct;
