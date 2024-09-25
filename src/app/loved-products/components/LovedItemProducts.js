import React, { useContext } from "react";
import { IconButton, Typography } from "@mui/material";
import { FaTrash, FaShoppingCart } from "react-icons/fa"; 
import { CartContext } from "@/context/CartContext";
import { useLovedProducts } from "@/context/UseLovedProducts";
import { formatPrice } from "../../../../lib/formatPrice";

function LovedItemProduct({ product }) {
  const { removeLovedItem } = useLovedProducts();
  const { addToCart } = useContext(CartContext);

  const imageUrl = product.attributes?.images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
    : "/default-image.jpg";

  const removeToCheckout = () => {
    removeLovedItem(product.id);
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-md hover:shadow-lg rounded-lg flex flex-col md:flex-row items-center p-4 w-full max-w-md transition-transform duration-300 ease-in-out transform hover:scale-104">


        <img
          src={imageUrl}
          alt={product.attributes.productName}
          className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-4" // Cambia a object-cover para evitar bordes
        />

        {/* Contenido del producto */}
        <div className="flex-grow">
          <Typography variant="h6" className="font-semibold text-gray-800">
            {product.attributes.productName}
          </Typography>
          <Typography
            variant="subtitle1"
            className="text-green-600 font-semibold"
          >
            {formatPrice(product.attributes.price)}
          </Typography>
        </div>

        {/* Contenedor para los íconos a la derecha */}
        <div className="flex flex-col space-y-2 ml-4">
          {/* Botón para añadir al carrito como ícono */}
          <IconButton
            className="text-gray-500 hover:text-green-500 transition-colors"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart size={20} />
          </IconButton>
          {/* Botón para eliminar el producto */}
          <IconButton
            className="text-gray-500 hover:text-red-500 transition-colors"
            onClick={removeToCheckout}
          >
            <FaTrash size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default LovedItemProduct;
