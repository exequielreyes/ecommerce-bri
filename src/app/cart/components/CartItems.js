/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "../../../../lib/formatPrice";
import QuantitySelector from "./QuantitySelector";
import BuyStripe from "./BuyStripe";
import Modal from "./Modal";
import { useState } from "react";

const { IconButton } = require("@mui/material");
const { FaHeart, FaTrash } = require("react-icons/fa");



const CartItems = ({ cart, removeFromCart, addLoveItem, handleQuantityChange }) => {
    const [isModalOpen, setModalOpen] = useState(false); // Estado del modal
  
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  
    return (
      <div className="md:w-2/3 pr-4">
        {cart.map((product) => {
          const imageUrl = product.attributes?.images?.data?.[0]?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
            : "/default-image.jpg";
  
          return (
            <div
              key={product.id}
              className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-md hover:shadow-lg rounded-lg mb-4 p-6 flex items-center justify-between transition-transform transform hover:scale-104 "
            >
              <img
                src={imageUrl}
                alt={product.attributes.productName || "Sin título"}
                className="w-32 h-32 object-contain rounded-md border border-gray-200"
              />
              <div className="ml-6">
                <h5 className="text-lg font-semibold mb-2 text-gray-800">
                  {product.attributes?.productName || "Nombre no disponible"}
                </h5>
                <div className="flex space-x-4 mb-2 bg-gray-200 p-2 rounded-full w-auto">
                  <p className="text-sm font-semibold">
                    Color: {product.attributes?.color || "No disponible"}
                  </p>
                  <p className="text-sm font-semibold">
                    Talle: {product.attributes?.size || "No disponible"}
                  </p>
                  <p className="text-sm font-semibold text-lime-600 ">
                    {formatPrice(product.attributes?.price)}
                  </p>
                </div>
  
                <p className="text-gray-800 font-semibold mt-4">
                  ARS{" "}
                  {formatPrice(
                    product.attributes?.price
                      ? product.attributes.price * product.quantity
                      : "N/A"
                  )}
                </p>
  
                {/* Botones de "Comprar ahora" y "Modificar" */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => BuyStripe(product)}
                    className="bg-transparent text-black py-2 rounded hover:text-green-600 transition-colors duration-300"
                  >
                    Comprar ahora
                  </button>
                  <button
                    onClick={openModal} // Abre el modal al hacer clic
                    className="bg-transparent text-black px-4 py-2 rounded hover:text-blue-600 transition-colors duration-300"
                  >
                    Modificar
                  </button>
                </div>
              </div>
  
              <QuantitySelector
                quantity={product.quantity}
                onIncrease={() =>
                  handleQuantityChange(product.id, product.quantity + 1)
                }
                onDecrease={() =>
                  handleQuantityChange(product.id, product.quantity - 1)
                }
              />
              <div className="ml-6 flex flex-col space-y-4 items-center">
                <IconButton
                  className="text-gray-600 hover:text-red-500 transition-colors"
                  onClick={() => removeFromCart(product.id)}
                >
                  <FaTrash size={20} />
                </IconButton>
                <IconButton
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                  onClick={() => addLoveItem(product)}
                >
                  <FaHeart size={20} />
                </IconButton>
              </div>
            </div>
          );
        })}
  
        {/* Modal */}
        {isModalOpen && <Modal onClose={closeModal} />}
      </div>
    );
  };

export default CartItems;


