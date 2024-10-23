import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Heart, Ruler, ShoppingCart } from "lucide-react";
import axios from "axios";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { formatPrice } from "../../../../../../lib/formatPrice"; // Asegúrate de tener esta función
import { useLovedProducts } from "@/context/UseLovedProducts";
import Image from "next/image";
import ModalTalles from "./ModalTalles";

const InfoProduct = ({ product }) => {
  // const [preferenceId, setPreferenceId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts();
  const [added, setAdded] = useState(false); // Estado para controlar el feedback visual
  const { isSignedIn } = useUser();
  const router = useRouter();

 
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, {
  //   locale: "es-AR",
  // });

  // Función para crear la preferencia de pago
  const createPreference = async () => {
    try {
      const discountAmount =
        product.attributes.price * (product.attributes.discount / 100);
      const finalPrice = product.attributes.price - discountAmount;
      console.log("Creating preference with:", {
        title: product.attributes.productName,
        quantity: quantity,
        price: Number(finalPrice), // Asegúrate de convertir el precio a número
        image: product.attributes.images,
      });

      const response = await axios.post("/api/create_preference", {
        title: product.attributes.productName,
        quantity: quantity,
        price: Number(finalPrice), // Convertir el precio a número
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

    // Asegúrate de que el talle esté seleccionado
    if (!selectedSize) {
      setSizeError("Por favor, selecciona un talle antes de agregar al carrito.");
      return;
    }

    setSizeError("");
    addToCart({ ...product, quantity, size: selectedSize });
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
      // Redirigir a la página de checkout con el producto y preferenceId
      const query = new URLSearchParams({
        preferenceId: id,
        product: JSON.stringify({ ...product, quantity, selectedSize }), // Pasar el producto como query
      }).toString();
  
      router.push(`/checkout?${query}`);
    }
  };

  // Desestructuración de los atributos del producto
  const {productName,description,price,discount,quantity: availableStock,sizes} = product.attributes;
  const discountAmount = price * (discount / 100);
  const finalPrice = price - discountAmount;


  // Funciones para manejar la cantidad
  const incrementQuantity = () => {
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //funcion para abrir y cerrar el modal de guia de talles
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      {/* Nombre del producto y origen */}
      <div className="flex justify-between mb-[1rem]"  >
        <h2  className="font-bold text-[24px]" >
          {productName}
        </h2>
        <Heart
          width={28}
          strokeWidth={1}
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => {
            if(!isSignedIn){
              router.push("/sign-in")
            return;
            }
            addLoveItem(product)}}
        />
      </div>

      <hr style={{ margin: "1rem 0" }} />

      {/* Descripción del producto */}
      <p>
        {description}
      </p>

      <hr style={{ margin: "1rem 0" }} />

      {/* Precios y descuento */}
      <div className="my-4" >
        {discount > 0 && (
          <p className="line-through text-[#808080] text-sm">
            {formatPrice(price)}
          </p>
        )}
        <div className="flex items-center gap-2">
          <h3 className="text-[26px] flex">

            <span>
              {formatPrice(finalPrice).split(",")[0]} {/* Parte entera */}
            </span>
            <span className="text-sm pt-[6px]" >
              {formatPrice(finalPrice).split(",")[1]} {/* Parte decimal */}
            </span>
          </h3>
          {discount > 0 && (
            <span className="text-[#00a650] text-base">
              {`-${discount}% OFF`}
            </span>
          )}
        </div>

        {/* Stock disponible y selección de cantidad */}
        <div sx={{ mt: 2 }}>
          

        {/* Selector de talles */}
        {sizes && sizes.data.length > 0 ? (
            <div className="flex gap-2 flex-wrap mt-2" >
              <p className="text-sm mr-1 flex items-center text-[#808080]">Talles disponibles:</p>
              {sizes.data.map((size) => (
                <button
                  key={size.id}
                  style={{
                    border: selectedSize === size.attributes.name ? '2px solid #3B82F6' : '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    width:'64px',
                    height:'36px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                  // variant={selectedSize === size.attributes.name ? "contained" : "outlined"}
                  onClick={() => {
                    setSelectedSize(size.attributes.name)
                    setSizeError("")}} 
                >
                  {size.attributes.name}
                </button>
                
              ))}
              
            </div>
          ) : (
            <p className="mt-2 text-sm text-[#808080]" >
              No hay talles disponibles.
            </p>
          )}
          {sizeError && (
            <p className="text-[#FF0000] mt-2 text-sm">
              {sizeError}
            </p>
          )}


          {/* Botón de Guía de talles */}
          <Button
            variant="outlined"
            startIcon={<Ruler />}
            sx={{ mt: 2 }}
            onClick={handleOpenModal}
          >
            Guía de talles
          </Button>

          {/* Modal de Guía de talles */}
         <ModalTalles open={openModal} onClose={handleCloseModal} />
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Quiero:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc", // Color y grosor del borde
                borderRadius: "10px", // Bordes redondeados
                padding: "5px", // Espaciado interno
              }}
            >
              <Button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                sx={{
                  backgroundColor: "#000000", // Cambia el color de fondo según tus preferencias
                  color: "#ffffff",
                  borderRadius: "20px", // Para bordes redondeados
                  minWidth: "30px", // Ancho mínimo
                  height: "30px", // Altura para el botón
                  padding: "0", // Eliminar el padding
                  "&:hover": {
                    backgroundColor: "#232121", // Color de fondo al pasar el mouse
                  },
                  ...(quantity <= 1 && {
                    backgroundColor: "#ccc",
                    color: "#fff",
                  }), // Cambia el fondo a gris y texto a blanco si está deshabilitado
                }}
              >
                -
              </Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button
                onClick={incrementQuantity}
                disabled={quantity >= availableStock}
                sx={{
                  backgroundColor: "#000000", // Cambia el color de fondo según tus preferencias
                  color: "#ffffff",
                  borderRadius: "20px", // Para bordes redondeados
                  minWidth: "30px", // Ancho mínimo
                  height: "30px", // Altura para el botón
                  padding: "0", // Eliminar el padding
                  "&:hover": {
                    backgroundColor: "#232121", // Color de fondo al pasar el mouse
                  },
                  ...(quantity >= availableStock && {
                    backgroundColor: "#ccc",
                    color: "#fff",
                  }),
                }}
              >
                +
              </Button>
            </Box>
          </Box>
            <p  className="text-[#808080] text-sm mt-1">
            {`Stock disponible: ${availableStock}`}
          </p>
        </div>
      </div>

      {/* Botones de "Añadir al carrito" y "Comprar" */}
      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          variant={added ? "contained" : "outlined"}
          color={added ? "success" : "primary"}
          onClick={handleAddToCart}
          disabled={added || availableStock <= 0}
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
          disabled={availableStock <= 0}
        >
          Comprar
        </Button>
      </Box>

      {/* MercadoPago Wallet */}
      {/* {preferenceId && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )} */}
    </div>
  );
};

export default InfoProduct;



