/* eslint-disable @next/next/no-img-element */
import { SignIn } from "@clerk/nextjs";
import { Home } from "lucide-react";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Encabezado con el nombre en la esquina superior izquierda */}
        <header className="absolute top-0 left-0 p-6 z-10 flex items-center">
          <a
            href="/"
            className="flex items-center text-xl font-bold text-gray-900 hover:text-gray-600 transition duration-200"
          >
            {/* Icono de casita usando lucide-react */}
            <Home className="h-6 w-6 mr-2" />
            IndumentaryBrix
          </a>
        </header>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignIn />
        </main>

        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Superposición para mejorar contraste */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img
            alt="Login"
            src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="relative p-12 hidden lg:block">
           

            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Bienvenido a IndumentaryBrix 🦑
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Inicia sesión para acceder a tu cuenta y disfrutar de todas nuestras funciones exclusivas. 
              Gestiona tus pedidos, guarda tus productos favoritos y recibe recomendaciones personalizadas.
              ¡Estamos aquí para hacer tu experiencia más sencilla y agradable!
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}