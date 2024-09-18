/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CarouselProduct = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.data.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.data.length) % images.data.length
    );
  };

  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[currentIndex].attributes.url}`;

  console.log('Image URL:', imageUrl);
  console.log('Images Data:', images.data);

  return (
    <Box sx={{ position: "relative", px: { sm: 8 } }}>
      <Box
        component="img"
        src={imageUrl}
        alt="Image Product"
        sx={{ width: "100%", borderRadius: 2 }}
      />

      {/* Botón Anterior */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Botón Siguiente */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default CarouselProduct;



