
import Link from "next/link";
import { useState } from "react";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import MenuList from "./MenuList";
import { Heart, ShoppingCart, User } from 'lucide-react';
import Search from "./Search";

import { useLovedProducts } from "@/context/UseLovedProducts";





function NavBar() {

//obtener el contexto del carrito
const { cart } = useContext(CartContext);
const { lovedItems} = useLovedProducts();

//se desplega el menu
const [isOpen, setIsOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
const { signOut } = useClerk();
const { isSignedIn, user } = useUser();
const router = useRouter();

const toggleMenu = () => {
    setIsOpen(!isOpen)
}

const handleLogout = async () => {
  await signOut();
};


const handleMouseEnter = () => {
  setIsModalOpen(true);
};

const handleMouseLeave = () => {
  setIsModalOpen(false);
};

const handleCartClick = (e) => {
  if (!isSignedIn) {
    e.preventDefault();
    router.push('/sign-in');
  }
};

  return (
    <nav className="  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl cursor-pointer"  onClick={() => router.push("/")}  > Indumentary
          <span className="font-bold">BRIX</span>
        </h1>


        {/* <div className='items-center justify-between hidden sm:flex'>
           <MenuList />
        </div> */}
       <div className="flex-grow flex justify-center items-center gap-4">
          {/* MenuList y Barra de búsqueda */}
          <MenuList />
          <Search />
          
        </div>
        


        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul className={`absolute z-10 top-0 left-0 right-0 bottom-0  md:relative md:flex md:flex-row md:justify-center md:items-center ${isOpen ? 'flex flex-col mt-20 md:mt-0' : 'hidden'} md:flex space-x-4 md:space-x-6 md:mt-0 items-center md:absolute md:right-0`}>
          
          {/* <li className="text-xl ">
            <Link className="no-underline  hover:border-b-4 hover:py-2 hover:border-black" href="/products">Productos</Link>
          </li> */}
          

 <div className='flex items-center justify-between gap-3 sm:gap-7'>

          <li className="relative">
            <Link className="text-black flex items-center" href="/cart" onClick={handleCartClick}>
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-white bg-purple-500 rounded-full text-xs font-semibold">{cart.length}</span>
              )}
            </Link>
          </li>

          <li className="relative">
              <Link className="text-black flex items-center" href="/loved-products">
                <Heart className={`w-6 h-6 ${lovedItems.length > 0 ? 'fill-black dark:fill-white' : ''}`} />
                {lovedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-white bg-purple-500 rounded-full text-xs font-semibold">
                    {lovedItems.length}
                  </span>
                )}
              </Link>
            </li>


     
          {isSignedIn && (
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/dashboard">
                {/* <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a1 1 0 011-1h12a1 1 0 011 1v1H3v-1zm3-3a1 1 0 011-1h4a1 1 0 011 1v1H6v-1z" />
                </svg> */}
                <User  className="w-6 h-6 text-black"/>

              </Link>
              {isModalOpen && (
                <div
                  className="absolute bg-white text-black p-4 w-48 rounded shadow-md mt-2 text-xl"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p>¡Hola, {user.firstName || 'Usuario'}!</p>
                  <Link href="/dashboard" className="block text-blue-500 hover:underline">
                   Perfil
                  </Link>
                  <Link href="/orders" className="block text-blue-500 hover:underline">
                    Favoritos
                  </Link>
                  <button onClick={handleLogout} className="block text-blue-500 hover:underline">Cerrar sesión</button>
                </div>
              )}
            </li>
          )}
          {!isSignedIn && (
            <li>
              <Link href="/sign-in">
                {/* <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a1 1 0 011-1h12a1 1 0 011 1v1H3v-1zm3-3a1 1 0 011-1h4a1 1 0 011 1v1H6v-1z" />
                </svg> */}
                <User className="w-6 h-6 text-black" />
              </Link>
            </li>
          )}
          </div>
        </ul>
        </div>
        

    </nav>
  );
}

export default NavBar;
