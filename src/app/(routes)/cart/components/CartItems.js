/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "../../../../../lib/formatPrice";
import QuantitySelector from "./QuantitySelector";
import BuyStripe from "./BuyStripe";
import {
  Modal,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { FaHeart, FaTimes, FaTrash } from "react-icons/fa";
import Image from "next/image";

const CartItems = ({
  cart,
  removeFromCart,
  addLoveItem,
  handleQuantityChange,
  updateSize,
  updateQuantity,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const [newSize, setNewSize] = useState("");

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setNewQuantity(product.quantity);
    setNewSize(product.size || ""); // Asegúrate de que el tamaño actual se establece aquí
    console.log("Selected product:", product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      // Comprobar si se debe actualizar la cantidad
      if (newQuantity > 0 && newQuantity !== selectedProduct.quantity) {
        handleQuantityChange(
          selectedProduct.id,
          selectedProduct.size,
          newQuantity,
          selectedProduct.attributes.quantity
        );
      }

      // Comprobar si se debe actualizar el tamaño
      if (newSize && newSize !== selectedProduct.size) {
        updateSize(selectedProduct.id, selectedProduct.size, newSize);
      }
    }
    handleClose();
  };

  return (
    <div className="md:w-2/3 pr-4">
      {cart.map((product) => {
        console.log("Product:", product);
        const imageUrl = product.attributes?.images?.data?.[0]?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
          : "/default-image.jpg";
        const price = product.attributes?.price || 0;
        const discount = product.attributes?.discount || 0;
        const discountAmount = price * (discount / 100);
        const finalPrice = price - discountAmount;

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
                  Talle: {product.size || "No disponible"}
                </p>
              </div>

              {/* Cálculo del precio final y descuento */}
              <div className="flex flex-col">
                {discount > 0 && (
                  <p className="text-sm font-semibold text-gray-500 line-through">
                    {formatPrice(price)}
                  </p>
                )}
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black">
                    ARS{formatPrice(finalPrice * product.quantity)}
                  </p>
                  {discount > 0 && (
                    <p className="text-sm text-red-600 ml-2">{discount}% OFF</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => BuyStripe(product)}
                  className="bg-transparent text-black py-2 rounded hover:text-green-600 transition-colors duration-300"
                >
                  Comprar ahora
                </button>
                <button
                  onClick={() => handleOpen(product)}
                  className="bg-transparent text-black px-4 py-2 rounded hover:text-blue-600 transition-colors duration-300"
                >
                  Modificar
                </button>
              </div>
            </div>

            <QuantitySelector
              quantity={product.quantity}
              availableStock={product.attributes.quantity}
              onIncrease={() =>
                handleQuantityChange(
                  product.id,
                  product.size,
                  product.quantity + 1,
                  product.attributes.quantity
                )
              }
              onDecrease={() =>
                handleQuantityChange(
                  product.id,
                  product.size,
                  product.quantity - 1,
                  product.attributes.quantity
                )
              }
            />
            <div className="ml-6 flex flex-col space-y-4 items-center">
              <IconButton
                className="text-gray-600 hover:text-red-500 transition-colors"
                onClick={() =>
                  removeFromCart({ id: product.id, size: product.size })
                }
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
      {/* Modal para modificar producto */}
      <Modal open={open} onClose={handleClose}>
        <Box className="w-1/3 mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg flex">
          {/* Sección izquierda con fondo gris */}
          <div className="flex-none bg-gray-200 p-4 rounded-l-lg">
            <Image
              src={
                selectedProduct?.attributes?.images?.data?.[0]?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedProduct.attributes.images.data[0].attributes.url}`
                  : "/default-image.jpg"
              }
              alt={selectedProduct?.attributes?.productName || "Sin título"}
              width={250}
              height={250}
              className="object-contain rounded-md border border-gray-300 mb-2"
            />
            <h5 className="text-lg font-semibold mb-1 text-gray-800">
              {selectedProduct?.attributes?.productName ||
                "Nombre no disponible"}
            </h5>

            {/* Cálculo del precio final y descuento */}
            {selectedProduct && (
              <>
                {/* Cálculo del precio y descuento */}
                {(() => {
                  const price = selectedProduct.attributes.price || 0;
                  const discount = selectedProduct.attributes.discount || 0;
                  const discountAmount = price * (discount / 100);
                  const finalPrice = price - discountAmount;

                  return (
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-500 line-through">
                        {formatPrice(price)}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black">
                          {formatPrice(finalPrice)}
                        </p>
                        {discount > 0 && (
                          <p className="text-sm text-red-600 ml-2">
                            ({discount}% de descuento)
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </div>

          {/* Sección derecha con fondo blanco */}
          <div className="flex-grow bg-white p-4 rounded-r-lg relative">
            <IconButton
              className="absolute top-[-1.5rem] right-[-1.5rem]"
              onClick={handleClose}
            >
              <FaTimes />
            </IconButton>
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel id="size-label">Talle</InputLabel>
                <Select
                  labelId="size-label"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                >
                  {Array.isArray(selectedProduct?.attributes?.sizes?.data) &&
                  selectedProduct.attributes.sizes.data.length > 0 ? (
                    selectedProduct.attributes.sizes.data.map((size) => (
                      <MenuItem key={size.id} value={size.attributes.name}>
                        {size.attributes.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay talles disponibles</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="mb-8">
              <QuantitySelector
                quantity={newQuantity}
                availableStock={selectedProduct?.attributes?.quantity || 0}
                onIncrease={() => setNewQuantity(newQuantity + 1)}
                onDecrease={() =>
                  setNewQuantity(newQuantity > 1 ? newQuantity - 1 : 1)
                }
              />
            </div>
            <div className="flex">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                className="w-full"
              >
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CartItems;
