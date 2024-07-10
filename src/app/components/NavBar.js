"use client"
import Link from "next/link";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function NavBar() {

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
          <li className="text-black">
            <Link href="/shoppingcart">Cart</Link>
          </li>
        </ul>
        </div>
        

    </nav>
  );
}

export default NavBar;
