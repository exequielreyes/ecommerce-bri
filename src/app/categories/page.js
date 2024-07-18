'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Filtrar por Categorías</h1>
      <div className="mb-4">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded p-4">
           <div className="relative w-full h-64 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;