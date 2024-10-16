"use client";
import { useLovedProducts } from "@/context/UseLovedProducts";
import LovedItemProduct from "./components/LovedItemProducts";
import { useRouter } from "next/navigation";
import ProductModal from "@/app/components/ProductModal";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

function Page() {
  const { lovedItems } = useLovedProducts();
  const { addToCart } = useContext(CartContext);
  const lovedItemsCount = lovedItems.length;
  const router = useRouter();


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
  return (
    <div className="max-w-6xl py-8 mt-[-50px] mx-auto sm:py-32 sm:px-4">
      <div className="mb-4">
      <ol className="flex items-center  justify-center gap-1 text-sm text-gray-600">
        <li>
          <button onClick={() => router.back()} className="block transition hover:text-blue-500">
            <span className="sr-only">Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
        </li>
        <li class="rtl:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </li>
        <li>
          <h1 className="block transition text-3xl font-bold text-center  sm:text-4xl  text-black dark:text-[#B4B4B4]">
            Mis favoritos{" "}
            <span className="text-sm text-gray-500">({lovedItemsCount})</span>
          </h1>

        </li>
      </ol>
      </div>
      <div className=" rounded-lg p-6">
        {lovedItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay productos en la sección de favoritos
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {lovedItems.map((item) => (
              <LovedItemProduct key={item.id} product={item} onAddToCart={() => handleAddToCartClick(item)} />
            ))}
          </ul>
        )}
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

export default Page;