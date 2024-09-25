"use client";
import { useLovedProducts } from "@/context/UseLovedProducts";
import LovedItemProduct from "./components/LovedItemProducts";

function Page() {
  const { lovedItems } = useLovedProducts();
  const lovedItemsCount = lovedItems.length;

  return (
    <div className="max-w-6xl py-8 mt-[-50px] mx-auto sm:py-32 sm:px-4">
      <h1 className="text-3xl font-bold text-center mb-6 sm:text-4xl text-black">
        Mis favoritos{" "}
        <span className="text-sm text-gray-500">({lovedItemsCount})</span>
      </h1>

      <div className=" rounded-lg p-6">
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
