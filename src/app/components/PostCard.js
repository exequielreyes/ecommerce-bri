"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import { CartContext } from "@/context/CartContext";
import { Box, Button, Grid, Skeleton } from "@mui/material"; 
import { useLovedProducts } from "@/context/UseLovedProducts";

function PostCard() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del producto actual
  const itemsToShow = 3; // Número de productos a mostrar al mismo tiempo
  const { addLoveItem} = useLovedProducts();

  useEffect(() => {
    async function fetchProducts() {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        setProducts(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Función para mover hacia la izquierda
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para mover hacia la derecha
  const handleNext = () => {
    if (currentIndex < products.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

   

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
      <div className="relative">
        {/* Contenedor del carrusel */}
        <Grid container spacing={4}>
          {loading ? (
            // Mostrar 3 Skeletons mientras se carga
            Array(3)
              .fill()
              .map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box border={1} borderColor="grey.200" borderRadius="borderRadius" p={2} className="h-96">
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                    <Box mt={2}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Box>
                </Grid>
              ))
          ) : products.length > 0 ? (
            products
              .slice(currentIndex, currentIndex + itemsToShow) // Muestra solo 3 productos a la vez
              .map((product) => {
                const { attributes, id } = product;
                const { slug, images, productName } = attributes;

                return (
                  <Grid item xs={12} sm={6} md={4} key={id}>
                    <div className="group p-3">
                      <div
                        className="py-4 border border-gray-200 shadow-none h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg"
                        style={{ width: "100%", maxWidth: "280px", margin: "auto" }} // Fijar el ancho máximo
                      >
                        <div className="relative flex items-baseline justify-center px-6 py-2 h-80 overflow-hidden">
                          <Link href={`/products/${slug}`} passHref>
                            <Image
                              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`}
                              alt={productName}
                              width={400}
                              height={256}
                              layout="responsive"
                            />
                          </Link>
                          <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5 cursor-pointer">
                            <div className="flex justify-center gap-x-6">
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  addToCart(product);
                                }}
                                aria-label="add to cart"
                                className="bg-white text-black hover:bg-black hover:text-white"
                              >
                                <ShoppingCart size={24} />
                              </IconButton>
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  addLoveItem(product)
                                }}
                                aria-label="add to favorites"
                                className="bg-white text-black hover:bg-black hover:text-white"
                              >
                                <Heart size={24} />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                        <Link href={`/products/${slug}`} passHref>
                          <div className="flex justify-between gap-4 px-8 mt-5">
                            <h3
                              className="text-lg font-bold cursor-pointer"
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis", // Limita el nombre largo con "..."
                                width: "100%",
                              }}
                            >
                              {productName}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Grid>
                );
              })
          ) : (
            <div>No products found.</div>
          )}
        </Grid>

        {/* Botones de navegación */}
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0} // Desactivar botón si está al inicio
          className="absolute top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-black  rounded-full w-10 h-10 flex justify-center items-center"
          style={{ left: '-65px', zIndex: 10 }}
        >
          {"<"}
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex >= products.length - itemsToShow} // Desactivar botón si está al final
          className="absolute  top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-black  rounded-full w-10 h-10 flex justify-center items-center"
          style={{ right: '-65px', zIndex: 10 }}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

export default PostCard;
