import Link from "next/link";
import { useState, useContext } from "react";
import { CartContext } from '../../context/CartContext';
import { useClerk, useUser, UserButton} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import MenuList from "./MenuList";
import { Heart, ShoppingCart, User } from 'lucide-react';
import Search from "./Search";
import { useLovedProducts } from "@/context/UseLovedProducts";

function NavBar() {
  const { cart } = useContext(CartContext);
  const { lovedItems } = useLovedProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = async () => {
    await signOut();
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsModalOpen(false), 200);
    setTimeoutId(id);
  };

  const handleCartClick = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      router.push('/sign-in');
    }
  };

  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          Indumentary<span className="font-semibold">BRIX</span>
        </h1>
        
        <div className="flex-grow flex justify-center items-center gap-4">
          <MenuList />
          <Search />
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <ul className={`absolute z-10 top-0 left-0 right-0 bottom-0 md:relative md:flex md:flex-row md:justify-center md:items-center ${isOpen ? 'flex flex-col mt-20 md:mt-0' : 'hidden'} md:flex space-x-4 md:space-x-6 md:mt-0 items-center md:absolute md:right-0`}>
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
              <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link href="/dashboard">
                  <UserButton className="w-6 h-6 text-black" />
                </Link>
                
                {isModalOpen && (
                  <div
                    className="absolute right-0 bg-white text-black p-4 w-48 rounded shadow-md mt-2 text-lg transition-opacity duration-200 ease-in-out"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p className="font-semibold">¡Hola, {user.firstName || 'Usuario'}!</p>
                    <Link href="/user-profile" className="block text-blue-500 hover:underline">Perfil</Link>
                    <Link href="/loved-products" className="block text-blue-500 hover:underline">Favoritos</Link>
                    <button onClick={handleLogout} className="block text-blue-500 hover:underline">Cerrar sesión</button>
                  </div>
                )}
              </li>
            )}
            {!isSignedIn && (
              <li>
                <Link href="/sign-in">
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
