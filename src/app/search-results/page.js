
/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext'; // Importar el contexto del carrito
import { formatPrice } from '../../../lib/formatPrice';
// import FiltersControlsCategory from '../category/components/FilterControlsCategory';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: '',
    category: '',
    size: '',
    color: '',
    origin: '',
  });
  const [showProducts, setShowProducts] = useState(true);

  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [query]);

  useEffect(() => {
    filterProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterProducts = () => {
    let updatedProducts = [...products];

    if (filters.price) {
      updatedProducts = updatedProducts.sort((a, b) => {
        if (filters.price === 'low-high') return a.price - b.price;
        if (filters.price === 'high-low') return b.price - a.price;
        return 0;
      });
    }

    if (filters.category) {
      updatedProducts = updatedProducts.filter(product => product.category === filters.category);
    }

    if (filters.size) {
      updatedProducts = updatedProducts.filter(product => product.size.includes(filters.size));
    }

    if (filters.color) {
      updatedProducts = updatedProducts.filter(product => product.color === filters.color);
    }

    if (filters.origin) {
      updatedProducts = updatedProducts.filter(product => product.origin === filters.origin);
    }

    setFilteredProducts(updatedProducts);
  };

  const handleSearchIconClick = () => {
    setShowProducts(false);
  };

  const getImageUrl = (product) => {
    const url = product.attributes?.images?.data?.[0]?.attributes?.url;
    const fullUrl = url ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}` : '/default-image.jpg';
    console.log(fullUrl); // Verifica la URL aquí
    return fullUrl;
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Resultados de búsqueda para: "{query}"</h1>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-4">
        <select name="price" onChange={handleFilterChange} className="border rounded p-2">
          <option value="">Filtrar por precio</option>
          <option value="low-high">De menor a mayor</option>
          <option value="high-low">De mayor a menor</option>
        </select>

        <select name="category" onChange={handleFilterChange} className="border rounded p-2">
          <option value="">Filtrar por categoría</option>
          <option value="buzos">Buzos</option>
          <option value="pantalones">Pantalones</option>
          <option value="remeras">Remeras</option>
        </select>

        <select name="size" onChange={handleFilterChange} className="border rounded p-2">
          <option value="">Filtrar por tamaño</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <select name="color" onChange={handleFilterChange} className="border rounded p-2">
          <option value="">Filtrar por color</option>
          <option value="red">Rojo</option>
          <option value="blue">Azul</option>
          <option value="black">Negro</option>
        </select>

        <select name="brand" onChange={handleFilterChange} className="border rounded p-2">
          <option value="">Filtrar por marca</option>
          <option value="nike">Nike</option>
          <option value="adidas">Adidas</option>
          <option value="puma">Puma</option>
        </select>
      </div>

      {/* Lista de productos */}
      {showProducts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="relative group h-[400px] flex flex-col">
              <Link href={`/products/${product.id}`} className="block h-full">
                <div className="bg-white shadow-md rounded p-4 flex flex-col h-full relative overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <img 
                    src={getImageUrl(product)} 
                    alt={product.title || "Sin título"}
                    className="w-full h-48 object-cover mb-2"  // Reducido el margen inferior
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-1">{product.title}</h3> {/* Reducido el margen inferior */}
                    <p className="text-green-500 text-lg font-bold">{formatPrice(product.price)}</p> {/* Colocado en la parte inferior */}
                  </div>
                </div>
              </Link>
              {/* Botón para agregar al carrito */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation(); // Evita que el clic se propague al enlace
                    addToCart(product);
                  }}
                  aria-label="add to cart"
                  className='bg-white text-black hover:bg-black hover:text-white'
                >
                  <ShoppingCart size={28} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;












//(codigo que funciona)
// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
// import { IconButton } from '@mui/material';
// import { ShoppingCart } from 'lucide-react';
// import { CartContext } from '../../context/CartContext'; // Importar el contexto del carrito

// const SearchResults = () => {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('q') || '';

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     price: '',
//     category: '',
//     size: '',
//     color: '',
//     brand: '',
//   });
//   const [showProducts, setShowProducts] = useState(true);

//   const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

//   useEffect(() => {
//     if (query) {
//       fetch(`/api/search?q=${query}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setProducts(data);
//           setFilteredProducts(data);
//         })
//         .catch((error) => console.error('Error fetching data:', error));
//     }
//   }, [query]);

//   useEffect(() => {
//     filterProducts();
//   }, [filters]);

//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const filterProducts = () => {
//     let updatedProducts = [...products];

//     if (filters.price) {
//       updatedProducts = updatedProducts.sort((a, b) => {
//         if (filters.price === 'low-high') return a.price - b.price;
//         if (filters.price === 'high-low') return b.price - a.price;
//         return 0;
//       });
//     }

//     if (filters.category) {
//       updatedProducts = updatedProducts.filter(product => product.category === filters.category);
//     }

//     if (filters.size) {
//       updatedProducts = updatedProducts.filter(product => product.size.includes(filters.size));
//     }

//     if (filters.color) {
//       updatedProducts = updatedProducts.filter(product => product.color === filters.color);
//     }

//     if (filters.brand) {
//       updatedProducts = updatedProducts.filter(product => product.brand === filters.brand);
//     }

//     setFilteredProducts(updatedProducts);
//   };

//   const handleSearchIconClick = () => {
//     setShowProducts(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Resultados de búsqueda para: "{query}"</h1>

//       {/* Filtros */}
//       <div className="mb-4 flex flex-wrap gap-4">
//         <select name="price" onChange={handleFilterChange} className="border rounded p-2">
//           <option value="">Filtrar por precio</option>
//           <option value="low-high">De menor a mayor</option>
//           <option value="high-low">De mayor a menor</option>
//         </select>

//         <select name="category" onChange={handleFilterChange} className="border rounded p-2">
//           <option value="">Filtrar por categoría</option>
//           <option value="electronics">Remeras</option>
//           <option value="fashion">Pantalones</option>
//         </select>

//         <select name="size" onChange={handleFilterChange} className="border rounded p-2">
//           <option value="">Filtrar por tamaño</option>
//           <option value="S">S</option>
//           <option value="M">M</option>
//           <option value="L">L</option>
//           <option value="XL">XL</option>
//         </select>

//         <select name="color" onChange={handleFilterChange} className="border rounded p-2">
//           <option value="">Filtrar por color</option>
//           <option value="red">Rojo</option>
//           <option value="blue">Azul</option>
//           <option value="black">Negro</option>
//         </select>

//         <select name="brand" onChange={handleFilterChange} className="border rounded p-2">
//           <option value="">Filtrar por marca</option>
//           <option value="nike">Nike</option>
//           <option value="adidas">Adidas</option>
//           <option value="puma">Puma</option>
//         </select>
//       </div>

//       {/* Lista de productos */}
//       {showProducts && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredProducts.map(product => (
//             <div key={product.id} className="relative group h-[400px] flex flex-col">
//               <Link href={`/products/${product.id}`} className="block h-full">
//                 <div className="bg-white shadow-md rounded p-4 flex flex-col h-full relative overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
//                   <img 
//                     src={product.image} 
//                     alt={product.title} 
//                     className="w-full h-48 object-cover mb-2"  // Reducido el margen inferior
//                   />
//                   <div className="flex-1 flex flex-col justify-between">
//                     <h3 className="text-lg font-semibold mb-1">{product.title}</h3> {/* Reducido el margen inferior */}
//                     <p className="text-green-500 text-lg font-bold">${product.price}</p> {/* Colocado en la parte inferior */}
//                   </div>
//                 </div>
//               </Link>
//               {/* Botón para agregar al carrito */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                 <IconButton
//                   onClick={(event) => {
//                     event.stopPropagation(); // Evita que el clic se propague al enlace
//                     addToCart(product);
//                   }}
//                   aria-label="add to cart"
//                   className='bg-white text-black hover:bg-black hover:text-white'
//                 >
//                   <ShoppingCart size={28} />
//                 </IconButton>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;




