"use client";

import { useState, useEffect, useContext } from "react";
import { Box, Button, Divider, Grid, Skeleton, Typography } from "@mui/material"; 
import FiltersControlsCategory from "../components/FilterControlsCategory";
import FilterControlCategory from "./components/FilterControlCategory";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "next/navigation";



export default function Page(){

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  
  // Estados para los filtros
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Nuevo estado para las categorías



 // Estados para la paginación
 const [currentPage, setCurrentPage] = useState(1); // Página actual
 const productsPerPage = 6; // Número de productos por página


  useEffect(() => {
    async function fetchProducts() {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[active][$eq]=true&populate=*`;
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

   // Filtrar los productos
   const filteredProducts = products
   .filter(product => 
     selectedGender.length === 0 || 
     selectedGender.includes(product?.attributes?.taste)
   )
   .filter(product => 
     filterOrigin.length === 0 || 
     filterOrigin.includes(product?.attributes?.origin)
   )
   .filter(product => 
     selectedColors.length === 0 || 
     selectedColors.includes(product?.attributes?.color)
   )
    // Filtra por categoría
    .filter(product => 
      selectedCategories.length === 0 || 
      selectedCategories.includes(product?.attributes?.category?.data?.attributes?.categoryName)
   )

 // Filtra por búsqueda
 .filter(product => 
  product?.attributes?.productName?.toLowerCase().includes(query.toLowerCase())
)

   .sort((a, b) => {
     if (filterPrice === 'asc') return a?.attributes?.price - b?.attributes?.price;
     if (filterPrice === 'desc') return b?.attributes?.price - a?.attributes?.price;
     return 0;
   });

// Calcular productos actuales para la página actual
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

// Cambiar de página
const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

// Número total de páginas
const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


  return (
    <Box className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
    <Typography variant="h4" component="h1" gutterBottom>
    {query ? `Resultado de la búsqueda: "${query}"` : "Todas las categorías"}
    </Typography>
    <Divider className="mb-3" />

    <Box className="flex flex-col sm:flex-row gap-6">
      {/* Filtros a la izquierda */}
      <Box 
      className="flex-shrink-0 sm:w-1/4 sticky top-20"
      style={{alignSelf: 'flex-start'}}
      >
       <FilterControlCategory 
         selectedCategories={selectedCategories} // Pasa el estado de categorías
         setSelectedCategories={setSelectedCategories} // Función para actualizar las categorías
        />
        <FiltersControlsCategory
          filterOrigin={filterOrigin}
          setFilterOrigin={setFilterOrigin}
          setFilterPrice={setFilterPrice}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
        
      </Box>

      {/* Productos a la derecha */}
      <Box className="flex-grow">
        <Grid container spacing={4}>
          {loading ? (
            Array(3).fill().map((_, index) => (
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
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" variant="h6" className="mt-40">
                No se encontraron productos.
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Paginación */}
        <Box className="mt-8 flex justify-center space-x-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 text-sm font-semibold rounded-full transition duration-150 flex items-center justify-center ${
                currentPage === index + 1
                  ? "bg-gradient-to-tr from-purple-600 to-blue-300 text-white shadow-lg"
                  : "border border-purple-300 text-purple-700 hover:bg-purple-50"
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
  );
}