// import PostCard from "@/app/components/PostCard"

import Image from "next/image";
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import ProductPageClient from "../[idproduct]/ProductPageClient";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Skeleton, Box, Typography, Container, Divider, Grid, Paper, IconButton, Button } from '@mui/material';
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "../../../../lib/formatPrice";


async function loadProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { idproduct } = params;

  try {
    const post = await loadProduct(idproduct);

    return (



  <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box mb={4} textAlign="left">
          <Typography variant="h6" color="skyblue">
            {post.category} &gt; {post.title}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ px: 10 }}>
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={260}
                layout="responsive"
                style={{ borderRadius: '8px' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {post.title}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>
                {post.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" color="textSecondary" paragraph>
                {formatPrice(`${post.price}`)}
              </Typography>
              <ProductPageClient product={post} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  } catch (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          No se pueden recuperar los detalles del producto. Por favor, inténtelo de nuevo más tarde.
        </Typography>
      </Container>
     );
  }
}





