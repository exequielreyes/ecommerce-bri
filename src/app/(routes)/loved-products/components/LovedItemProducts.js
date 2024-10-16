
import React, { useContext } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "@/context/CartContext";
import { useLovedProducts } from "@/context/UseLovedProducts";
import { formatPrice } from "../../../../../lib/formatPrice";
import Link from "next/link";
import Image from "next/image";

function LovedItemProduct({ product, onAddToCart }) {
  const { removeLovedItem } = useLovedProducts();
  const { addToCart } = useContext(CartContext);

  const imageUrl = product.attributes?.images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
    : "/default-image.jpg";

  const removeToCheckout = () => {
    removeLovedItem(product.id);
  };

  // Calcular precio con descuento
  const price = product.attributes.price;
  const discount = product.attributes.discount || 0; // Asumimos que el descuento viene en los atributos
  const discountAmount = price * (discount / 100);
  const finalPrice = price - discountAmount;

  return (
    <div className="flex justify-center mb-4">
      {/* Agregar Link para redirigir al detalle del producto */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-md hover:shadow-lg rounded-lg flex flex-col md:flex-row items-center p-4 w-full max-w-md transition-transform duration-300 ease-in-out transform hover:scale-104">
      <Link href={`/products/${product.attributes.slug}`} className="flex justify-center w-full items-center">
          <Image
            src={imageUrl}
            alt={product.attributes.productName}
            width={120} // Ancho de la imagen
            height={120}
            className="w-32 h-32 object-contain rounded-md mb-4 md:mb-0 md:mr-4"
          />

          {/* Contenido del producto */}
          <div className="flex-grow">
            <p  className="font-semibold text-gray-800 text-[20px]">
              {product.attributes.productName}
            </p>
            <div className="bg-gray-200 rounded-full w-max px-2">
              <span className="text-gray-950 mr-3 text-xs">
                Color: {product.attributes.color}
              </span>
            </div>

            {/* Mostrar precios con descuento */}
            {discount > 0 ? (
              <div className="flex flex-col">
                <span className="text-gray-500 line-through text-xs mt-1">
                  {formatPrice(price)} 
                </span>
                <div className="flex items-baseline">
                  <span className="text-black font-semibold text-lg">
                    {formatPrice(finalPrice)} 
                  </span>
                  <span className="text-red-600 ml-2 text-sm">
                    {discount}% OFF {/* Porcentaje de descuento al lado */}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-black font-semibold">
                {formatPrice(price)}
              </span >
            )}
          </div>

          {/* Contenedor para los íconos a la derecha */}
          <div className="flex flex-col space-y-2 ml-4">
            
            <button
              className="text-gray-500 hover:text-green-500 transition-colors mb-4"
              onClick={(e) => {
                e.preventDefault(); // Evita la navegación al hacer clic en el ícono
                onAddToCart();
                // addToCart(product);
              }}
            >
              <FaShoppingCart size={20} />
            </button>
            
            <button
              className="text-gray-500 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.preventDefault(); 
                removeToCheckout();
              }}
            >
              <FaTrash size={20} />
            </button>
          </div>
      </Link>
        </div>
    </div>
  );
}

export default LovedItemProduct;

