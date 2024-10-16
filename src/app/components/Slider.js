
'use client'

import "react-responsive-carousel/lib/styles/carousel.min.css";  // requiere un cargador
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    // Llama a la API de Strapi para obtener las imágenes
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sliders?populate=*`);
        const data = await response.json();
        setSliderList(data.data);  // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error("Error al traer las imágenes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative text-white text-[20px] w-full mx-auto">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} interval={6000} transitionTime={1500} >
        {sliderList.length > 0 ? (
          sliderList.map((slider, index) => (
            <div key={index}>
              {slider.attributes.image?.data[0]?.attributes?.url ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${slider.attributes.image.data[0].attributes.url}`}
                  alt={slider.attributes.name || "slider"}
                  width={1920}
                  height={1080}
                  className="w-full h-[577px] object-cover"
                />
              ) : (
                <p>No image available</p>
              )}
              <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                Shop now
              </div>
            </div>
          ))
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </Carousel>
    </div>
  );
}

export default Slider;

