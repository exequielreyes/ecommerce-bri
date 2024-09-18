/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import { formatPrice } from "../../../../lib/formatPrice";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useLovedProducts } from "@/context/UseLovedProducts";

 //Mapeo de los nombres de colores en español a codigo hexadecimales
 const colorMap = {
  negro: "#000000",
  rojo: "#FF0000",
  verde: "#008000",
  azul: "#0000FF",
  blanco: "#FFFFFF",
  gris: "#808080",
}

// Función para determinar el color del texto en función del color de fondo
const getTextColor = (backgroundColor) => {
  // Calculamos el brillo del color de fondo para decidir si el texto debe ser oscuro o claro
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Usamos la fórmula para calcular el brillo relativo
  const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return brightness > 0.5 ? '#000000' : '#FFFFFF'; // Texto oscuro si el fondo es claro, y viceversa
};

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts();

// Aquí obtenemos el color del backend y lo mapeamos al código de color correspondiente
const dynamicColor = colorMap[product.attributes.color.toLowerCase()] || '#78350f'; // Color por defecto si no se encuentra
const textColor = getTextColor(dynamicColor);
 

  return (
    <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md group">
      
      {/* Link separado para la imagen */}
      <Link href={`/products/${product.attributes.slug}`}>
        <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.attributes.taste}
          </p>
          <p className="px-2 py-1 text-xs rounded-full w-fit"
            style={{ backgroundColor: dynamicColor , color: textColor }}
          >
            {product.attributes.origin}
          </p>
        </div>

        <div className="w-full max-w-sm">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`}
            alt="Image"
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex justify-center gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            addToCart(product);
          }}
          aria-label="add to cart"
          className="bg-white text-black hover:bg-black hover:text-white "
        >
          <ShoppingCart size={20} />
        </IconButton>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            addLoveItem(product);
          }}
          aria-label="add to favorites"
          className="bg-white text-black hover:bg-black hover:text-white"
        >
          <Heart size={20} />
        </IconButton>
      </div>
      {/* </div> */}

      {/* Link separado para el nombre del producto */}
      <Link href={`/products/${product.attributes.slug}`}>
        <p className="text-2xl  cursor-pointer">
          {product.attributes.productName}
        </p>

        {/* Precio del producto */}
        <p className="font-bold ">{formatPrice(product.attributes.price)}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
