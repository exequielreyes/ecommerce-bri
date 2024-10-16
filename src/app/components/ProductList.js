
'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton'; // Shadcn UI Skeleton
import ProductItem from './ProductItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel';
import ProductModal from './ProductModal';
import { formatPrice } from '../../../lib/formatPrice';
import CarouselProduct from '../(routes)/products/[productSlug]/components/CarouselProduct';
import { CartContext } from "@/context/CartContext";

function ProductList({ productList }) {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // Número inicial de categorías a mostrar
  const [isDragging, setIsDragging] = useState(false); // Flag para saber si se está arrastrando
  const [startX, setStartX] = useState(0); // Posición inicial del mouse
  const { addToCart } = useContext(CartContext);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  useEffect(() => {
    //     // Simulación de tiempo de carga
    const timer = setTimeout(() => {
      setLoading(false);
    }); // Cambia este tiempo según lo necesario

    return () => clearTimeout(timer);
  }, []);


 // Función para abrir el modal y seleccionar un producto
 const handleAddToCartClick = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
  
};

// Función para cerrar el modal
const handleCloseModal = () => {
  setSelectedProduct(null);
  setIsModalOpen(false);
};
  

  const limitedProducts = productList.slice(currentIndex, currentIndex + itemsToShow);

  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsToShow(1);
    } else if (width < 768) {
      setItemsToShow(2);
    } else if (width < 1024) {
      setItemsToShow(3);
    } else {
      setItemsToShow(4);
    }
  };

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  // Función para mover hacia la izquierda
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para mover hacia la derecha
  const handleNext = () => {
    if (currentIndex < productList.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Manejadores de eventos para el arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    if (dx > 50) {
      handlePrev();
      setIsDragging(false); // Resetea el estado de arrastre
    } else if (dx < -50) {
      handleNext();
      setIsDragging(false); // Resetea el estado de arrastre
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  

  return (
    <div className='mt-10'>
      <h2 className='text-3xl mb-5 text-center font-bold sm:pb-3'>Productos destacados</h2>

      <div className="relative">
        <Carousel
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <CarouselContent>
            {/* Productos o Skeletons */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {loading
                ? Array(itemsToShow)
                  .fill()
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[300px] w-full" /> // Skeleton para cada producto
                  ))
                : limitedProducts.map((product, index) => (
                  <ProductItem
                    product={product}
                    key={index}
                    onAddToCart={() => handleAddToCartClick(product)}
                  />
                ))}
            </div>

          </CarouselContent>
          {/* <CarouselPrevious 
           onClick={handlePrev}
           disabled={currentIndex === 0}
           />
            <CarouselNext 
            onClick={handleNext}
            disabled={currentIndex >= productList.length - itemsToShow}
            />  */}
          <button
            className={`carousel-button absolute left-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>
          <button
            className={`carousel-button absolute right-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex >= productList.length - itemsToShow ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={currentIndex >= productList.length - itemsToShow}
          >
            &#10095;
          </button>
        </Carousel>
      </div>

     
   {/* Aca debe ir el modal*/}
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


