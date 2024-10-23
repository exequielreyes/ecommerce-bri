"use client";

import { useState, useEffect, useContext } from "react";

import { CartContext } from "@/context/CartContext";
import { Skeleton } from "@mui/material";

import FiltersControlsCategory from "../components/FilterControlsCategory";
import FilterControlCategory from "./components/FilterControlCategory";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "next/navigation";
import ProductModal from "@/app/components/ProductModal";

export default function Page() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Estados para los filtros
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Nuevo estado para las categorías

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 6; // Número de productos por página

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

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
    .filter(
      (product) =>
        selectedGender.length === 0 ||
        selectedGender.includes(product?.attributes?.taste)
    )
    .filter(
      (product) =>
        filterOrigin.length === 0 ||
        (product?.attributes?.brand?.data &&
          filterOrigin.includes(
            product?.attributes?.brand?.data?.attributes?.name
          ))
    )
    .filter(
      (product) =>
        selectedColors.length === 0 ||
        selectedColors.includes(product?.attributes?.color)
    )
    // Filtra por categoría
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(
          product?.attributes?.category?.data?.attributes?.categoryName
        )
    )
    // Filtra por búsqueda
    .filter((product) =>
      product?.attributes?.productName
        ?.toLowerCase()
        .includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (filterPrice === "asc")
        return a?.attributes?.price - b?.attributes?.price;
      if (filterPrice === "desc")
        return b?.attributes?.price - a?.attributes?.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl pb-16 mx-auto   ">
      <h1 className="text-[32px] mb-4 dark:text-[#B4B4B4]">
        {query
          ? `Resultado de la búsqueda: "${query}"`
          : "Todas las categorías"}
      </h1>
      <hr className="mb-3 dark:bg-[#b4b4b43a]" />

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filtros a la izquierda */}
        <div
          className="flex-shrink-0 sm:w-1/4 sticky top-20 "
          style={{ alignSelf: "flex-start" }}
        >
          <div className="overflow-auto max-h-[500px] overflow-x-hidden mr-[0.9rem]">
            <FilterControlCategory
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
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
          </div>
        </div>

        {/* Productos a la derecha */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    style={{
                      borderRadius: "8px",
                      padding: "16px",
                      height: "300px",
                    }}
                    key={index}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                    <div className="mt-[16px]">
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </div>
                  </div>
                ))
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCartClick(product)}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center mt-40">
                <h2 className="text-lg font-semibold">
                  No se encontraron productos.
                </h2>
              </div>
            )}
          </div>

          {/* Paginación */}
          <div className="mt-8 flex justify-center space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 text-sm font-semibold transition duration-150 flex items-center justify-center ${
                  currentPage === index + 1
                    ? "bg-[#3B82F6] text-white shadow-lg" // Fondo activo
                    : "border border-[#3B82F6] text-[#3B82F6] hover:bg-blue-100" // Fondo inactivo
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
