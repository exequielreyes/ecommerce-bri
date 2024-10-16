/* eslint-disable @next/next/no-img-element */
import { SignUp } from "@clerk/nextjs";
import { Home } from "lucide-react";

export default function Page() {
  return(
    <section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

 
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt="Registo"
        src="https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
    </section>
    

    <header className="absolute top-0 right-0 p-6 z-10 flex items-center justify-start">
          <a
            href="/"
            className="flex items-center text-xl font-bold text-gray-900 hover:text-gray-600 transition duration-200"
          >
            {/* Icono de casita usando lucide-react */}
            <Home className="h-6 w-6 mr-2" />
            IndumentaryBrix
          </a>
        </header>
       
    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
  <SignUp/>
    
    </main>
  </div>
</section>
   );
  }