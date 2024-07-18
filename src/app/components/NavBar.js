
import Link from "next/link";
import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
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
    <nav className=" bg-customBlue p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="text-white  text-2xl font-bold">
        <Link href="/">Brix_Indumentary</Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
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
        <ul className={`absolute z-10 top-0 left-0 right-0 bottom-0 bg-customBlue md:relative md:flex md:flex-row md:justify-center md:items-center ${isOpen ? 'flex flex-col mt-20 md:mt-0' : 'hidden'} md:flex space-x-4 md:space-x-6 md:mt-0 items-center md:absolute md:right-0`}>
          <li className="text-xl font-semibold">
            <Link className="no-underline text-white hover:border-b-4 hover:py-2 hover:border-white" href="/">Inicio</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link className="no-underline text-white hover:border-b-4 hover:py-2 hover:border-white" href="/about">Acerca de mi</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link className="no-underline text-white hover:border-b-4 hover:py-2 hover:border-white" href="/categories">Categoria</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link className="no-underline text-white hover:border-b-4 hover:py-2 hover:border-white" href="/products">Productos</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link className="no-underline text-white hover:border-b-4 hover:py-2 hover:border-white" href="/contact">Contactos</Link>
          </li>
          <li className="relative">
            <Link className="text-white flex" href="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
              </svg>
              {cart.length > 0 && (
                <span className="badge bg-danger">{cart.length}</span>
              )}
            </Link>
          </li>
        </ul>
        </div>
        

    </nav>
  );
}

export default NavBar;
