"use client";
import { useLovedProducts } from "@/context/UseLovedProducts";
import LovedItemProduct from "./components/LovedItemProducts";

function Page() {
  const { lovedItems } = useLovedProducts();

  return (
    <div className="max-w-6xl py-8 mx-auto sm:py-32 sm:px-4">
      <h1 className="text-3xl font-bold text-center mb-10 sm:text-4xl text-black">
        Productos que te gustan
      </h1>

      <div className="bg-white shadow-xl rounded-lg p-6">
        {lovedItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay productos en la sección de favoritos
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {lovedItems.map((item) => (
              <LovedItemProduct key={item.id} product={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Page;
