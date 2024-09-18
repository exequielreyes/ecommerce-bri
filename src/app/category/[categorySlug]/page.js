

// "use client";
// import { useGetCategoryProduct } from '@/app/api/getCategoryProduct';
// import { Box, Typography, Grid, Skeleton, Divider } from '@mui/material';
// import { useParams } from "next/navigation";
// import FiltersControlsCategory from '../components/FilterControlsCategory';
// import ProductCard from '../components/ProductCard';
// import { useState } from "react";

// export default function Page() {
//   const params = useParams();
//   const { categorySlug } = params;
//   const { result, loading } = useGetCategoryProduct(categorySlug);
//   const [filterOrigin, setFilterOrigin] = useState('');
//   const [filterPrice, setFilterPrice] = useState('');
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedGender, setSelectedGender] = useState([]);

//   // Filtra los productos solo si hay datos disponibles y no está cargando
//   const filteredProducts = result && !loading && Array.isArray(result)
//     ? result
//         // Filtra por género
//         .filter(product => selectedGender.length === 0 || selectedGender.includes(product?.attributes?.taste))
//         // Filtra por origen
//         .filter(product => filterOrigin.length === 0 || filterOrigin.includes(product?.attributes?.origin))
//         // Filtra por color
//         .filter(product => selectedColors.length === 0 || selectedColors.includes(product?.attributes?.color))
//         // Ordena por precio si está seleccionado
//         .sort((a, b) => {
//           if (filterPrice === 'asc') return a?.attributes?.price - b?.attributes?.price;
//           if (filterPrice === 'desc') return b?.attributes?.price - a?.attributes?.price;
//           return 0;
//         })
//     : [];

//   return (
//     <Box className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
//       {!loading && result && result.length > 0 && (
//         <Typography variant="h4" component="h1" gutterBottom>
//           {result[0]?.attributes?.category?.data?.attributes?.categoryName || "Categoría no disponible"}
//         </Typography>
//       )}
//       <Divider className='mb-3' />

//       <Box className="flex flex-col sm:flex-row gap-6">
//         <Box className="flex-shrink-0 sm:w-1/4">
//           <FiltersControlsCategory 
//             filterOrigin={filterOrigin} 
//             setFilterOrigin={setFilterOrigin} 
//             setFilterPrice={setFilterPrice}
//             selectedColors={selectedColors}
//             setSelectedColors={setSelectedColors}
//             selectedGender={selectedGender}
//             setSelectedGender={setSelectedGender}
//           />
//         </Box>
//         <Box className="flex-grow">
//           <Grid container spacing={4}>
//             {loading && (
//               Array(3).fill().map((_, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Box border={1} borderColor="grey.200" borderRadius="borderRadius" p={2} className="h-80">
//                     <Skeleton variant="rectangular" width="100%" height="100%" />
//                   </Box>
//                 </Grid>
//               ))
//             )}
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <Grid item xs={12} sm={6} md={4} key={product.id}>
//                   <ProductCard product={product} />
//                 </Grid>
//               ))
//             ) : (
//               !loading && (
//                 <Grid item xs={12}>
//                   <Typography align="center" variant="h6" className="mt-40">
//                     No se encontraron resultados para la búsqueda.
//                   </Typography>
//                 </Grid>
//               )
//             )}
//           </Grid>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


"use client";
import { useGetCategoryProduct } from '@/app/api/getCategoryProduct';
import { useParams } from "next/navigation";
import FiltersControlsCategory from '../components/FilterControlsCategory';
import ProductCard from '../components/ProductCard';
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params;
  const { result, loading } = useGetCategoryProduct(categorySlug);
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  // Filtra los productos solo si hay datos disponibles y no está cargando
  const filteredProducts = result && !loading && Array.isArray(result)
    ? result
        // Filtra por género
        .filter(product => selectedGender.length === 0 || selectedGender.includes(product?.attributes?.taste))
        // Filtra por origen
        .filter(product => filterOrigin.length === 0 || filterOrigin.includes(product?.attributes?.origin))
        // Filtra por color
        .filter(product => selectedColors.length === 0 || selectedColors.includes(product?.attributes?.color))
        // Ordena por precio si está seleccionado
        .sort((a, b) => {
          if (filterPrice === 'asc') return a?.attributes?.price - b?.attributes?.price;
          if (filterPrice === 'desc') return b?.attributes?.price - a?.attributes?.price;
          return 0;
        })
    : [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {!loading && result && result.length > 0 && (
        <h1 className="text-3xl font-semibold mb-4">
          {result[0]?.attributes?.category?.data?.attributes?.categoryName || "Categoría no disponible"}
        </h1>
      )}
      <hr className="mb-3" />

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filtros - lado izquierdo */}
        <div className="sm:w-1/4 flex-shrink-0">
          <FiltersControlsCategory 
            filterOrigin={filterOrigin} 
            setFilterOrigin={setFilterOrigin} 
            setFilterPrice={setFilterPrice}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        </div>

        {/* Productos - lado derecho */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mostrar skeletons mientras se cargan los productos */}
            {loading && (
              Array(3).fill().map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 h-80">
                  <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                </div>
              ))
            )}

            {/* Mostrar productos filtrados */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              !loading && (
                <div className="col-span-full text-center mt-40">
                  <h2 className="text-xl font-medium">
                    No se encontraron resultados para la búsqueda.
                  </h2>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}























//CODIGO FUNCIONANDO ANTERIORMENTE
// 'use client'
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { Skeleton, Box, Typography, Grid } from '@mui/material';

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch categories from the API
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('https://fakestoreapi.com/products/categories');
//         const data = await res.json();
//         console.log('Categories fetched:', data); // Log para depuración
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         let res;
//         if (selectedCategory) {
//           res = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`);
//         } else {
//           res = await fetch('https://fakestoreapi.com/products');
//         }
//         const data = await res.json();
//         console.log('Products fetched:', data);
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   return (
//     <Box className="container mx-auto p-4">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Filtrar por Categorías
//       </Typography>
//       <Box mb={4}>
//         <select
//           className="border border-gray-300 p-2 rounded"
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">Todas las Categorías</option>
//           {categories.length > 0 ? (
//             categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))
//           ) : (
//             <option disabled>Cargando categorías...</option>
//           )}
//         </select>
//       </Box>
//       <Grid container spacing={4}>
//         {loading ? (
//           Array(6).fill().map((_, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Box border={1} borderColor="grey.200" borderRadius="borderRadius" p={2}>
//                 <Skeleton variant="rectangular" width="100%" height={200} />
//                 <Box mt={2}>
//                   <Skeleton width="60%" height={30} />
//                   <Skeleton width="80%" height={20} />
//                   <Skeleton width="40%" height={20} />
//                 </Box>
//               </Box>
//             </Grid>
//           ))
//         ) : (
//           products.map((product) => (
//             <Grid item xs={12} sm={6} md={4} key={product.id}>
//               <Box border={1} borderColor="grey.200" borderRadius="borderRadius" p={2}>
//                 <Box position="relative" width="100%" height={200} mb={2}>
//                   <Image
//                     src={product.image}
//                     alt={product.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded"
//                   />
//                 </Box>
//                 <Typography variant="h6">{product.title}</Typography>
//                 <Typography color="textSecondary">{product.description}</Typography>
//                 <Typography color="primary">{product.category}</Typography>
//               </Box>
//             </Grid>
//           )))
//         }
//       </Grid>
//     </Box>
//   );
// };

// export default CategoriesPage;
