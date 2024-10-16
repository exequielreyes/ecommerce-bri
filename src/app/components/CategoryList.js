'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton'; // Shadcn UI Skeleton
import { Carousel, CarouselContent } from './ui/carousel';
import apiClient from '../api/GlobalApi'; // Asegúrate de importar tu cliente API
import Link from 'next/link';
import Image from 'next/image';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la categoría actual
  const [itemsToShow, setItemsToShow] = useState(5); // Número inicial de categorías a mostrar
  const [isDragging, setIsDragging] = useState(false); // Flag para saber si se está arrastrando
  const [startX, setStartX] = useState(0); // Posición inicial del mouse
  const [currentX, setCurrentX] = useState(0); // Posición actual del mouse

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.getCategoryList();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Ajustar el número de elementos mostrados en función del ancho de la pantalla
  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsToShow(1);
    } else if (width < 768) {
      setItemsToShow(3);
    } else if (width < 1024) {
      setItemsToShow(4);
    } else {
      setItemsToShow(5);
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
    if (currentIndex < categories.length - itemsToShow) {
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
    <div className="mt-10 md:px-52">
      <h3 className="text-3xl font-bold  text-center sm:pb-3">Elige tu categoría favorita</h3>
      <div className="relative">
        <Carousel
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} 
        >
          <CarouselContent>
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                width: `${categories.length * (100 / itemsToShow)}%`
              }}
            >
              {loading ? (
                Array(itemsToShow)
                  .fill()
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[200px] w-full" />
                  ))
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <div className="flex-shrink-0 px-1" style={{ width: `${100 / itemsToShow}%` }} key={category.id}>
                    <Link
                      href={`/category/${category.attributes.slug}`}
                      className="flex flex-col relative overflow-hidden bg-no-repeat bg-cover rounded-lg"
                    >
                      <div className="h-full w-full relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainImage.data.attributes.url}`}
                          width={358}
                          height={359}
                          alt={category.attributes.categoryName}
                          layout="responsive"
                          // objectFit="cover"
                          style={{ minHeight: "359px" }}
                          className="w-full h-auto transition duration-200 ease-in-out rounded-lg hover:scale-110 object-contain"
                        />
                      </div>
                      <p
                        className="py-2 text-lg font-bold text-center backdrop-blur-lg"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {category.attributes.categoryName}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <div>No categories found.</div>
              )}
            </div>
          </CarouselContent>
          <button
           className={`carousel-button absolute left-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>
          <button
            className={`carousel-button absolute right-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex >= categories.length - itemsToShow ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={currentIndex >= categories.length - itemsToShow}
          >
            &#10095;
          </button>
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryList;
