/* eslint-disable @next/next/no-img-element */

// "use client";
// import { useState } from "react";
// import { useGetCategories } from "../api/getProducts"; 
// import Link from "next/link";
// import { ChevronLeft, ChevronRight} from "lucide-react";
// import { Button, Skeleton, Box } from "@mui/material"; // Para los botones de desplazamiento y Skeleton

// const ChooseCategory = () => {
//   const { result, loading } = useGetCategories();
//   const [currentIndex, setCurrentIndex] = useState(0); // Índice de la categoría actual
//   const itemsToShow = 3; // Número de categorías a mostrar al mismo tiempo

//   // Verifica que result sea un array válido
//   const categories = result && Array.isArray(result) ? result : [];

//   // Función para mover hacia la izquierda
//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // Función para mover hacia la derecha
//   const handleNext = () => {
//     if (currentIndex < categories.length - itemsToShow) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   return (
//     <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
//       <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige tu categoría favorita</h3>
//       <div className="relative">
//         {/* Contenedor del carrusel */}
//         <div className="flex overflow-hidden gap-5">
//           {/* Contenedor que desplaza las tarjetas */}
//           <div
//             className="flex transition-transform duration-300 ease-in-out"
//             style={{
//               transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`, // Mueve las tarjetas sin afectar su tamaño
//               width: `${(categories.length / itemsToShow) * 100}%`, // Ajusta el ancho total del carrusel
//             }}
//           >
//             {loading ? (
//               // Mostrar 3 Skeletons mientras se carga
//               Array(itemsToShow)
//                 .fill()
//                 .map((_, index) => (
//                   <Box
//                     key={index}
//                     className="relative w-1/3 overflow-hidden bg-no-repeat bg-cover rounded-lg"
//                     style={{ flex: `0 0 calc(100% / ${itemsToShow})` }} // Ajusta el ancho de cada tarjeta
//                   >
//                     <Skeleton variant="rectangular" width="100%" height={200} />
//                     <Skeleton variant="text" width="80%" height={40} style={{ marginTop: '10px' }} />
//                   </Box>
//                 ))
//             ) : categories.length > 0 ? (
//               categories.map((category) => (
//                 <Link
//                   key={category.id}
//                   href={`/category/${category.attributes.slug}`}
//                   className="relative w-1/3 overflow-hidden bg-no-repeat bg-cover rounded-lg" // Mantener el ancho constante
//                   style={{ flex: `0 0 calc(100% / ${itemsToShow})` }} // Ajusta el ancho de cada tarjeta
//                 >
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainImage.data.attributes.url}`}
//                     alt={category.attributes.categoryName}
//                     className="w-full h-auto transition duration-200 ease-in-out rounded-lg hover:scale-110"
//                   />
//                   <p
//                     className="absolute w-full py-2 text-lg font-bold text-center text-black bottom-5 backdrop-blur-lg"
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis", // Limita el texto con puntos suspensivos si es muy largo
//                     }}
//                   >
//                     {category.attributes.categoryName}
//                   </p>
//                 </Link>
//               ))
//             ) : (
//               <div>No categories found.</div>
//             )}
//           </div>
//         </div>

//         {/* Botones de navegación */}
//         <Button
//           className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-500 disabled:bg-gray-200 text-black rounded-full w-12 h-12 flex justify-center items-center shadow-lg transition duration-300 ease-in-out"
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//         >
//           <ChevronLeft size={28} />
//         </Button>
//         <Button
//           className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-500 disabled:bg-gray-200 text-black rounded-full w-12 h-12 flex justify-center items-center shadow-lg transition duration-300 ease-in-out"
//           onClick={handleNext}
//           disabled={currentIndex >= categories.length - itemsToShow}
//         >
//           <ChevronRight size={28} />
//         </Button>

//       </div>
//     </div>
//   );
// };

// export default ChooseCategory;

"use client";
import { useState } from "react";
import { useGetCategories } from "../api/getProducts"; 
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ChooseCategory = () => {
  const { result, loading } = useGetCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const categories = result && Array.isArray(result) ? result : [];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < categories.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige tu categoría favorita</h3>
      <div className="relative flex items-center">
        {/* Botón de anterior */}
        <button
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-500 disabled:bg-gray-200 text-black rounded-full w-12 h-12 flex justify-center items-center shadow-lg transition duration-300 ease-in-out"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Contenedor del carrusel */}
        <div className="flex overflow-hidden gap-4 w-full">
          {/* Contenedor que desplaza las tarjetas */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              width: `${(categories.length / itemsToShow) * 100}%`,
            }}
          >
            {loading ? (
              Array(itemsToShow)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="relative w-1/3 overflow-hidden rounded-lg shadow-md"
                    style={{ flex: `0 0 calc(100% / ${itemsToShow})` }}
                  >
                   <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    <div className="h-8 w-4/5 bg-gray-400 animate-pulse mt-2 mx-auto"></div>
                  </div>
                ))
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.attributes.slug}`}
                  className="relative w-1/3 overflow-hidden   transition-shadow"
                  style={{ flex: `0 0 calc(100% / ${itemsToShow})` }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainImage.data.attributes.url}`}
                    alt={category.attributes.categoryName}
                    // className="w-full h-[300px] object-cover rounded-lg transition-transform duration-200 ease-in-out hover:scale-105"
                     className="w-full  transition duration-200 ease-in-out rounded-lg hover:scale-110"
                  />
                  <p
                    // className="absolute w-full py-2 text-lg font-bold text-center text-black bottom-5 backdrop-blur-lg"
                     className="absolute w-full py-2 text-lg font-bold text-center text-black bottom-14 backdrop-blur-lg"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis", 
                    }}
                  >
                   {category.attributes.categoryName}
                  </p>
                </Link>
              ))
            ) : (
              <div>No categories found.</div>
            )}
          </div>
        </div>

        {/* Botón de siguiente */}
        <button
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-500 disabled:bg-gray-200 text-black rounded-full w-12 h-12 flex justify-center items-center shadow-lg transition duration-300 ease-in-out"
          onClick={handleNext}
          disabled={currentIndex >= categories.length - itemsToShow}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChooseCategory;
