"use client";

import { useGetProductBySlug } from "@/app/api/getProductBySlug";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/SkeletonProduct";
import CarouselProduct from "./components/CarouselProduct";
import InfoProduct from "./components/InfoProduct";

function Page() {
  const params = useParams();
  const productSlug = params.productSlug;

  const { result } = useGetProductBySlug(productSlug);

  if (!result || result.length === 0 || !result[0].attributes) {
    return <SkeletonProduct />;
  }

  console.log(result[0].attributes.images);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          {/* Verificar si hay imágenes antes de renderizar el componente */}
          {result[0].attributes.images?.data?.length > 0 ? (
            <CarouselProduct images={result[0].attributes.images} />
          ) : (
            <p>No hay imágenes disponibles.</p>
          )}
        </div>
        <div className="sm:px-12">
          <InfoProduct product={result[0]} />
        </div>
      </div>
    </div>
  );
}

export default Page;




















//CODIGOFUNCIONANDO
// import Image from "next/image";
// import { useContext } from 'react';
// import { CartContext } from '../../context/CartContext';
// import ProductPageClient from "./[productSlug]/ProductPageClient";
// import { Skeleton, Box, Typography, Container, Divider, Grid, Paper, IconButton, Button } from '@mui/material';
// import { ShoppingCart } from "lucide-react";
// import { formatPrice } from "../../../lib/formatPrice";


// async function loadProduct(id) {
//   const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch product');
//   }
//   const data = await res.json();
//   return data;
// }

// export default async function Page({ params }) {
//   const { idproduct } = params;

//   try {
//     const post = await loadProduct(idproduct);

//     return (



//   <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Box mb={4} textAlign="left">
//           <Typography variant="h6" color="skyblue">
//             {post.category} &gt; {post.title}
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//         </Box>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Paper elevation={0} sx={{ px: 10 }}>
//               <Image
//                 src={post.image}
//                 alt={post.title}
//                 width={400}
//                 height={260}
//                 layout="responsive"
//                 style={{ borderRadius: '8px' }}
//               />
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Box sx={{ p: 2 }}>
//               <Typography variant="h4" component="h1" gutterBottom>
//                 {post.title}
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="body1" paragraph>
//                 {post.description}
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="h6" color="textSecondary" paragraph>
//                 {formatPrice(`${post.price}`)}
//               </Typography>
//               <ProductPageClient product={post} />
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   } catch (error) {
//     return (
//       <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
//         <Typography variant="h6" color="error">
//           No se pueden recuperar los detalles del producto. Por favor, inténtelo de nuevo más tarde.
//         </Typography>
//       </Container>
//      );
//   }
// }





