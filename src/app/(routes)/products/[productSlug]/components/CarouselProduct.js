/* eslint-disable @next/next/no-img-element */



import "react-responsive-carousel/lib/styles/carousel.min.css";  // requiere un cargador
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';

const CarouselProduct = ({ images, applyClass }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (images?.data) {
      const fetchedUrls = images.data.map((image) => {
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`;
      });
      setImageUrls(fetchedUrls);
    }
  }, [images]);

  return (
    <div className={`text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px] ${applyClass ? "" : "productCarousel"}`}>
      {imageUrls.length > 0 ? (
        <Carousel
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          thumbWidth={60}
          className={applyClass ? "" : "productCarousel"}
          
        >
          {imageUrls.map((url, index) => (
            <div key={index}  className={`${applyClass ? "w-auto h-auto" : "w-[500px] h-[500px] mx-auto flex items-center justify-center"}`} >
              <img 
              src={url} 
              alt={`Image ${index + 1}`} 
              className={`${applyClass ? "object-cover w-auto h-auto" : "object-contain w-full h-full"}`}
              />
              
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default CarouselProduct;