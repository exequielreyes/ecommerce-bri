'use client'
import Image from 'next/image';
import React from 'react';
import { Carousel, CarouselContent } from './ui/carousel';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

function BrandList({ brandList }) {
    const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let currentIndex = 0;
    const totalItems = brandList.length; // Total de marcas

    // Función para mover el carrusel de una en una
    const autoScroll = setInterval(() => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (currentIndex >= totalItems) {
        carousel.scrollLeft = 0; // Reinicia el scroll al inicio
        currentIndex = 0;
      } else {
        const itemWidth = carousel.scrollWidth / (totalItems * 2); // Ancho de un solo elemento
        carousel.scrollLeft += itemWidth; // Mueve el scroll el ancho de un solo elemento
        currentIndex++;
      }
    }, 3000); // Tiempo entre desplazamientos (2 segundos)

    return () => clearInterval(autoScroll); // Limpiar intervalo cuando el componente se desmonte
  }, [brandList]);
  return (
    <div>
      <h2 className='text-3xl mb-5 mt-24 text-center font-bold'>Navega por marcas</h2>

      <Carousel>
      <CarouselContent  
       ref={carouselRef}
          className="overflow-hidden whitespace-nowrap">
      <div className='flex space-x-4 p-4'> {/* Puedes cambiar la clase según el diseño que quieras */}
        {brandList.map((brand, index) => {
          const imageUrl = brand.attributes.image?.data?.attributes?.url;
        
          return (
            <Link 
            key={index} 
            href={`/brand-category/${brand.attributes.slug}`}
             className="min-w-[14.28%]  group cursor-pointer"
            >
            <div >
              {imageUrl ? (
                <Image 
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                  width={200}
                  height={150}
                  alt={brand.attributes.name}
                  className='hover:scale-110 transition-all ease-in-out h-[107px] object-contain dark:invert  '
                //   layout='responsive'
                //   style={{ minHeight: "107px" }} // Altura mínima para la imagen
                />
              ) : (
                <p>Marca no disponible</p> // Por si alguna marca no tiene imagen
              )}
            </div>
            </Link>
          );
        })}
      </div>
      </CarouselContent>
      </Carousel>
    </div>
  );
}

export default BrandList;
