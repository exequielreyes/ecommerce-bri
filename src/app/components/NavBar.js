
import Link from "next/link";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';



function NavBar() {

//obtener el contexto del carrito
const { cart } = useContext(CartContext);

//se desplega el menu
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
    setIsOpen(!isOpen)
}



  return (
    <nav className=" gb-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">
        <Link href="/">Brix_Indumentary</Link>
        </div>

        <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none" > 
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
                {isOpen ? (
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ): (
                    <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                )}
                </svg>
            </button>
        </div>
        <ul className={`flex-col md:flex-row md:flex ${isOpen ? 'block' : 'hidden'} space-x-4`}>
        <li className="text-black">
            <Link href="/">Home</Link>
          </li>
          <li className="text-black">
            <Link href="/about">About</Link>
          </li>
          <li className="text-black">
            <Link href="/products">Products</Link>
          </li>
          <li className="text-black">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="text-black relative">
            <Link href="\cart" className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
              </svg>
                {cart.length > 0 && (
                <span className="badge bg-danger">{cart.length}</span> // Mostrar el número de productos en el carrito
              )}
            </Link>
          </li>
        </ul>
        </div>
        

    </nav>
  );
}

export default NavBar;
