import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";

function BannerProduct() {
  return (
    <section className="relative mt-32 bg-[url(https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent sm:bg-transparent"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[500px] lg:items-center lg:px-8">
        <div className="max-w-xl text-start ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-gray-400 sm:text-5xl">
            Descubre la moda que
            <strong className="block font-extrabold text-gray-400">
              {" "}
              resalta tu estilo.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-gray-400 sm:text-xl/relaxed">
            En IndumentaryBrix, te ofrecemos las últimas tendencias en moda para
            que encuentres las prendas que mejor se adapten a tu personalidad.
            Calidad, diseño y exclusividad en cada colección.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/category/search-results"
              className="block w-full rounded bg-gray-700 px-12 py-3 text-sm font-medium text-gray-300 shadow hover:bg-gray-800 focus:outline-none focus:ring active:bg-gray-800 sm:w-auto"
              >
              Comprar
            </Link>

            <Link
              href="/about"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-gray-500 shadow hover:text-black focus:outline-none focus:ring active:text-black sm:w-auto"
            >
              Más información
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerProduct;
