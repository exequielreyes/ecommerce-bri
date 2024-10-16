//CODIGO PARA QUE NO SALGA EL ERROR DE CUANDO NO HAY UN PRODUCTO DE CIERTA CATEGORIA SE ROMPA LA PAGINA
"use client";
import { useGetCategoryProduct } from '@/app/api/getCategoryProduct';
import { Skeleton} from '@mui/material';
import { useParams } from "next/navigation";
import FiltersControlsCategory from '../components/FilterControlsCategory';
import ProductCard from '../components/ProductCard';
import { useContext, useState } from "react";
import ProductModal from '@/app/components/ProductModal';

import { CartContext } from '@/context/CartContext';

export default function Page() {
  const params = useParams();
  const { addToCart } = useContext(CartContext);
  const { categorySlug } = params;
  const { result, loading } = useGetCategoryProduct(categorySlug);
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 6; // Número de productos por página



 // Función para abrir el modal y seleccionar un producto
 const handleAddToCartClick = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
 
};

// Función para cerrar el modal
const handleCloseModal = () => {
  setSelectedProduct(null);
  setIsModalOpen(false);
};



  // Filtra los productos solo si hay datos disponibles y no está cargando
  const filteredProducts = result && !loading && Array.isArray(result)
    ? result
      // Filtra por género
      .filter(product => selectedGender.length === 0 || selectedGender.includes(product?.attributes?.taste))
      // Filtra por origen
      .filter(product => filterOrigin.length === 0 ||
        (product?.attributes?.brand?.data && filterOrigin.includes(product?.attributes?.brand?.data?.attributes?.name)))
      // Filtra por color
      .filter(product => selectedColors.length === 0 || selectedColors.includes(product?.attributes?.color))
      // Ordena por precio si está seleccionado
      .sort((a, b) => {
        if (filterPrice === 'asc') return a?.attributes?.price - b?.attributes?.price;
        if (filterPrice === 'desc') return b?.attributes?.price - a?.attributes?.price;
        return 0;
      })
    : [];


  // Calcular productos actuales para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



  // Función para obtener marcas únicas
  const getUniqueBrands = (products) => {

    if (!Array.isArray(products)) {
      return []; 
    }

    const brands = products.map(product => product.attributes.brand?.data?.attributes?.name);
    return [...new Set(brands)].filter(Boolean); 
  };
  const uniqueBrands = getUniqueBrands(result); // Obtener marcas únicas

  return (
    <div className="max-w-7xl pb-16 mx-auto ">
      {!loading && result && result.length > 0 && (
        <h1 className="text-[32px] mb-4 dark:text-[#B4B4B4]">
          {result[0]?.attributes?.category?.data?.attributes?.categoryName || "Categoría no disponible"}
        </h1>
      )}
      <hr className='mb-3 dark:bg-[#b4b4b43a]' />

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0 sm:w-1/4 sticky top-20 "
          style={{ alignSelf: 'flex-start' }}
        >

          <div className="overflow-auto max-h-[500px] overflow-x-hidden mr-[0.9rem]">
            <FiltersControlsCategory
              filterOrigin={filterOrigin}
              setFilterOrigin={setFilterOrigin}
              setFilterPrice={setFilterPrice}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              uniqueBrands={uniqueBrands}
            />
          </div>
        </div>
         {/* Productos a la derecha */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading && (
              Array(3).fill().map((_, index) => (
                <div style={{ borderRadius: '8px', padding: '16px', height: '300px' }} key={index}>
                
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                    <div className="mt-[16px]">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
              ))
            )}
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div  key={product.id}>
                  <ProductCard product={product} onAddToCart={() => handleAddToCartClick(product)} />
                </div>
              ))
            ) : (
              !loading && (
                <div className="col-span-full text-center mt-40">
                  <h2 className="text-lg font-semibold">
                    No se encontraron resultados para la búsqueda.
                  </h2>
                </div>
              )
            )}
          </div>
          
          {/* Paginación */}
          <div className="mt-8 flex justify-center space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 text-sm font-semibold  transition duration-150 flex items-center justify-center ${currentPage === index + 1
                    ? "bg-gradient-to-tr from-purple-600 to-blue-300 text-white shadow-lg"
                    : "border border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Aca debe ir el modal*/}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        addToCart={addToCart}
      />
    </div>
  );
}