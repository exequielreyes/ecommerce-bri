'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton, Box, Typography, Grid } from '@mui/material';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        console.log('Categories fetched:', data); // Log para depuración
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res;
        if (selectedCategory) {
          res = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        } else {
          res = await fetch('https://fakestoreapi.com/products');
        }
        const data = await res.json();
        console.log('Products fetched:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <Box className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Filtrar por Categorías
      </Typography>
      <Box mb={4}>
        <select
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las Categorías</option>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))
          ) : (
            <option disabled>Cargando categorías...</option>
          )}
        </select>
      </Box>
      <Grid container spacing={4}>
        {loading ? (
          Array(6).fill().map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box border={1} borderColor="grey.200" borderRadius="borderRadius" p={2}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Box mt={2}>
                  <Skeleton width="60%" height={30} />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="40%" height={20} />
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box border={1} borderColor="grey.200" borderRadius="borderRadius" p={2}>
                <Box position="relative" width="100%" height={200} mb={2}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </Box>
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="textSecondary">{product.description}</Typography>
                <Typography color="primary">{product.category}</Typography>
              </Box>
            </Grid>
          )))
        }
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
