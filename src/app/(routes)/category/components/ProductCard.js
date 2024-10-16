/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import { formatPrice } from "../../../../../lib/formatPrice";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useLovedProducts } from "@/context/UseLovedProducts";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

//Mapeo de los nombres de colores en español a codigo hexadecimales
const colorMap = {
  negro: "#000000",
  rojo: "#FF0000",
  verde: "#008000",
  azul: "#0000FF",
  blanco: "#FFFFFF",
  gris: "#808080",
};

// Función para determinar el color del texto en función del color de fondo
const getTextColor = (backgroundColor) => {
  // Calculamos el brillo del color de fondo para decidir si el texto debe ser oscuro o claro
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Usamos la fórmula para calcular el brillo relativo
  const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return brightness > 0.5 ? "#000000" : "#FFFFFF"; // Texto oscuro si el fondo es claro, y viceversa
};

function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useContext(CartContext);
  const { addLoveItem } = useLovedProducts();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { attributes } = product;
  const { discount, price } = attributes;

  
  const discountAmount = discount > 0 ? price * (discount / 100) : 0;
  const finalPrice = price - discountAmount;
  const dynamicColor =
    colorMap[product.attributes.color.toLowerCase()] || "#78350f"; // Color por defecto si no se encuentra
  const textColor = getTextColor(dynamicColor);

  return (
    <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md group border">
      {/* Link separado para la imagen */}
      <Link href={`/products/${product.attributes.slug}`}>
        <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.attributes.taste}
          </p>
          <p
            className="px-2 py-1 text-xs rounded-full w-fit"
            style={{ backgroundColor: dynamicColor, color: textColor }}
          >
            {product.attributes.brand &&
              product.attributes.brand.data &&
              product.attributes.brand.data.attributes
              ? product.attributes.brand.data.attributes.name
              : "Sin marca"}{" "}
            {/* Mostrar un texto alternativo si no hay marca */}
          </p>
        </div>

        <div className="w-full max-w-sm">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`}
            alt="Image"
            layout="responsive"
            width={500}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex justify-center gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart();
            // addToCart(product);

          }}
          aria-label="add to cart"
          className="bg-white text-black hover:bg-black hover:text-white "
        >
          <ShoppingCart size={20} />
        </IconButton>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();

            if (!isSignedIn) {
              // Si el usuario no está logueado, redirige a la página de inicio de sesión
              router.push("/sign-in");
            } else {
              // Si está logueado, agrega el producto a la lista de favoritos
              addLoveItem(product);
            }
          }}
          aria-label="add to favorites"
          className="bg-white text-black hover:bg-black hover:text-white"
        >
          <Heart size={20} />
        </IconButton>
      </div>
      {/* Link separado para el nombre del producto */}
      <Link href={`/products/${product.attributes.slug}`}>
        <p className="text-base  cursor-pointer dark:text-[#B4B4B4]">
          {product.attributes.productName}
        </p>
        <div className="flex flex-col gap-1 w-full mt-2">
          {discount > 0 ? (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 line-through ">
                {formatPrice(price)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg text-black font-bold dark:text-[#B4B4B4]">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-sm text-red-500 font-semibold">
                  {discount}% OFF
                </span>
              </div>
            </div>
          ) : (
            <p className="text-lg font-bold dark:text-[#B4B4B4]">{formatPrice(price)}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
