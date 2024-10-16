"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import {Skeleton } from "@mui/material";
import { useGetBrandProduct } from "@/app/api/getBrandList";
import FiltersControlsCategory from "../../category/components/FilterControlsCategory";
import ProductCard from "../../category/components/ProductCard";
import { useParams } from "next/navigation";
import ProductModal from "@/app/components/ProductModal";

export default function Page() {
  const { addToCart } = useContext(CartContext);
  const { brandSlug } = useParams();
  const { result: products, loading } = useGetBrandProduct(brandSlug);
  const [filterPrice, setFilterPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Filtramos los productos
  const filteredProducts =
    products && !loading && Array.isArray(products)
      ? products
          .filter(
            (product) =>
              selectedGender.length === 0 ||
              selectedGender.includes(product?.attributes?.taste)
          )
          .filter(
            (product) =>
              selectedColors.length === 0 ||
              selectedColors.includes(product?.attributes?.color)
          )
          .filter(
            (product) =>
              selectedCategories.length === 0 ||
              selectedCategories.includes(
                product?.attributes?.category?.data?.attributes?.categoryName
              )
          )
          .sort((a, b) => {
            if (filterPrice === "asc")
              return a?.attributes?.price - b?.attributes?.price;
            if (filterPrice === "desc")
              return b?.attributes?.price - a?.attributes?.price;
            return 0;
          })
      : [];

  return (
    <div className="max-w-7xl  mx-auto pb-16 ">
      {!loading && products && products.length > 0 && (
        <h1 className="text-[32px] mb-4 dark:text-[#B4B4B4]">
          {capitalizeFirstLetter(brandSlug) || "Marca no disponible"}{" "}
          {/* Mostramos el slug si no hay marca */}
        </h1>
      )}
      <hr className="mb-3 dark:bg-[#b4b4b43a]" />

      <div className="flex flex-col sm:flex-row gap-6">
        <div
          className="flex-shrink-0 sm:w-1/4 sticky top-20 "
          style={{ alignSelf: "flex-start" }}
        >
          <div className="overflow-auto max-h-[500px] overflow-x-hidden mr-[0.9rem]">
            <FiltersControlsCategory
              setFilterPrice={setFilterPrice}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading &&
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
                ))}
            {filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      product={product}
                      onAddToCart={() => handleAddToCartClick(product)}
                    />
                  </div>
                ))
              : !loading && (
                  <div className="col-span-full text-center mt-40">
                    <h2 className="text-lg font-semibold">
                      No se encontraron resultados para la búsqueda.
                    </h2>
                  </div>
                )}
          </div>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        addToCart={addToCart}
      />
    </div>
  );
}