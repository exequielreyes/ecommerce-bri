import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CarouselProduct from '../(routes)/products/[productSlug]/components/CarouselProduct';
import { formatPrice } from '../../../lib/formatPrice';

function ProductModal({ product, isOpen, onClose, addToCart }) {

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const hasStock = product?.attributes?.quantity > 0;
  const sizes = product?.attributes?.sizes || { data: [] };



  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null); // Reiniciar el talle seleccionado
      setQuantity(1); // Reiniciar la cantidad
      setSizeError(""); // Reiniciar el mensaje de error
    }
  }, [isOpen]);


  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError("Por favor, selecciona un talle antes de agregar al carrito.");
      return;
    }

    if (quantity > product?.attributes?.quantity) {
      alert(`No puedes agregar más de ${product?.attributes?.quantity} unidades de este producto.`);
      return;
    }

    setSizeError("");
    setQuantity(1);
    addToCart({ ...product, quantity, size: selectedSize });
  };

  const calculateDiscount = (price, discount) => {
    const discountAmount = price * (discount / 100);
    const finalPrice = price - discountAmount;
    return { discountAmount, finalPrice };
  };

  if (!isOpen) return null;







  return (
    // <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    //   <div className="bg-white rounded-lg p-6 w-[90%] md:w-[650px] max-h-[80vh] overflow-auto relative">

    //       {/* Contenido del modal */}
    //       {children}

    //       {/* Botón de cerrar */}
    //       <button
    //         onClick={onClose}
    //         className="absolute top-2 right-3 text-gray-800 hover:text-black text-lg"
    //       >
    //         &#x2715;
    //       </button>

    //   </div>
    // </div>
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] md:w-[650px] max-h-[80vh] overflow-auto relative">
        <div className="flex">
          {/* Imagen del producto */}
          <div className="w-1/2">
            <CarouselProduct images={product.attributes.images} applyClass={true} />
          </div>

          {/* Detalles del producto */}
          <div className="w-1/2 p-5">
            <h2 className="text-2xl font-bold">{product.attributes.productName}</h2>

            {/* Cálculo de precios */}
            {product.attributes.discount ? (
              <>
                <p className="text-gray-500 line-through text-sm">
                  {formatPrice(product.attributes.price)}
                </p>
                <div className='flex items-center gap-2'>
                  <p className="text-[22px]  font-bold mr-2 flex">
                    {formatPrice(calculateDiscount(product.attributes.price, product.attributes.discount).finalPrice).split(",")[0]}
                    <span className='text-xs pt-[5px]'>
                      {formatPrice(calculateDiscount(product.attributes.price, product.attributes.discount).finalPrice).split(",")[1]}
                    </span>
                  </p>
                  <p className="text-sm text-red-500">
                    {`${product.attributes.discount}%OFF`}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-lg text-black font-bold">
                {formatPrice(product.attributes.price)}
              </p>
            )}

            {/* Talles disponibles */}
            <div className="mt-4">
              <h3 className="font-semibold">Talles disponibles</h3>
              <div className="flex gap-2 mt-2">
                {sizes.data.length > 0 ? (
                  <div className='flex gap-1 flex-wrap '>
                    {sizes.data.map((size) => (
                      <Button
                        key={size.id}
                        variant={selectedSize === size.attributes.name ? "contained" : "outlined"}
                        onClick={() => {
                          setSelectedSize(size.attributes.name);
                          setSizeError("");
                        }}
                        disabled={!hasStock}
                      >
                        {size.attributes.name}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-500 mt-2'>No hay talles disponibles</p>
                )}
              </div>
              {sizeError && <p className='text-red-500 mt-1'>{sizeError}</p>}
            </div>

            {/* Cantidad */}
            <div className="mt-4">
              <h3 className="font-semibold">Cantidad</h3>
              <input
                type="number"
                value={quantity}
                min={1}
                max={product?.attributes?.quantity || 1}
                onChange={(e) => {
                  const value = Math.min(Math.max(e.target.value, 1), product?.attributes?.quantity);
                  setQuantity(value);
                }}
                className="border w-full px-2 py-1 mt-2"
              />
              <p className="text-gray-500 mt-1">Stock disponible: {product?.attributes?.quantity || 0}</p>
            </div>

            {/* Botón para agregar al carrito */}
            <div className="mt-6">
              <Button
                className={`bg-black text-white hover:bg-gray-800 w-full ${!hasStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleAddToCart}
                disabled={!hasStock}
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>

        {/* Cerrar modal */}
        <button
             onClick={onClose}
            className="absolute top-2 right-3 text-gray-800 hover:text-black text-lg"
           >
         &#x2715;
         </button>
      </div>
    </div>

  )
}

export default ProductModal