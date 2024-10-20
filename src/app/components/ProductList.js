'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Skeleton } from './ui/skeleton'; // Shadcn UI Skeleton
import ProductItem from './ProductItem';
import { CartContext } from "@/context/CartContext";
import ProductModal from './ProductModal';

function ProductList({ productList }) {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1); // Un producto por defecto
  const { addToCart } = useContext(CartContext);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulación de tiempo de carga

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsToShow(1); // Un producto en pantallas pequeñas
    } else if (width < 768) {
      setItemsToShow(2); // Dos productos en pantallas medianas
    } else if (width < 1024) {
      setItemsToShow(3); // Tres productos en pantallas grandes
    } else {
      setItemsToShow(4); // Cuatro productos en pantallas muy grandes
    }
  };

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  const limitedProducts = productList.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div className='mt-10'>
      <h2 className='text-3xl mb-5 text-center font-bold sm:pb-3'>Productos destacados</h2>

      <div className="relative">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array(itemsToShow)
                .fill()
                .map((_, index) => (
                  <Skeleton key={index} className="h-[300px] w-full" />
                ))
            : limitedProducts.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  onAddToCart={() => handleAddToCartClick(product)}
                />
              ))}
        </div>

        {/* Botones de navegación */}
        <button
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex === 0 ? 'hidden' : ''}`}
          onClick={() => setCurrentIndex(currentIndex - itemsToShow)}
          disabled={currentIndex === 0}
        >
          &#10094;
        </button>
        <button
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex >= productList.length - itemsToShow ? 'hidden' : ''}`}
          onClick={() => setCurrentIndex(currentIndex + itemsToShow)}
          disabled={currentIndex >= productList.length - itemsToShow}
        >
          &#10095;
        </button>
      </div>

      {/* Modal de producto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        addToCart={addToCart}
      />
    </div>
  );
}

export default ProductList;
