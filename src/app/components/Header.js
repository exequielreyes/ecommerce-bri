'use client'
import { Heart, LayoutGrid, Search as SearchIcon, ShoppingCart, User, User2Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import GlobalApi from '../api/GlobalApi'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ToogleTheme from './ToogleTheme'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { useLovedProducts } from '@/context/UseLovedProducts'
import { useClerk, UserButton, useUser } from '@clerk/nextjs'
import Search from './Search'
import Cart from '../(routes)/cart/page'
import CartModal from './CartModal'




function Header() {

  //obtener el contexto del carrito
  const { cart } = useContext(CartContext);
  const { lovedItems } = useLovedProducts();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Obtenemos la ruta actual
  const [timeoutId, setTimeoutId] = useState(null);
  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    // Actualizamos el estado basado en la ruta actual
    const isAuthPage = pathname.includes('sign-in') || pathname.includes('sign-up');
    setIsLogin(isAuthPage);

  }, [pathname]); // Cada vez que la ruta cambie, ejecutamos este efecto


  const searchBarRef = useRef(null);

  const handleLogout = async () => {
    await signOut();
  };

  const handleCartClick = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      router.push('/sign-in');
    } else {
      setOpenCart(!openCart);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsModalOpen(false), 200);
    setTimeoutId(id);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev); // Alterna el estado de búsqueda
  };

  // Manejar clics fuera de la barra de búsqueda para cerrarla
  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside); 
    } else {
      document.removeEventListener('mousedown', handleClickOutside); 
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, [isSearchOpen]);

  //traigo los categorias
  useEffect(() => {
    getCategoryList();
  }, [])

 
  // useEffect(() => {
  //   setOpenCart(true);
  // }, [cart])


  const closeCartModal = () => {
    setOpenCart(false);
  };

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data)
    })
  }

  return (
    !isLogin && (
      <div className='sticky top-0 z-50 bg-white dark:bg-[#19191A]  md:px-16 px-5 flex justify-between mb-4 p-5'>
        <div className='flex items-center gap-8'>
          <h1
            className='text-xl sm:text-2xl md:text-3xl cursor-pointer dark:text-[#B4B4B4]'
            onClick={() => router.push("/")}
          >Indumentary
            <span className='font-bold dark:text-[#D7D7D7]'>Brix</span>
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2
                className='hidden md:flex gap-2 items-center border 
                            rounded-full p-2 px-10 bg-slate-200 cursor-pointer dark:bg-[#19191A]'
              >
                <LayoutGrid className='h-5 w-5' /> Categorias
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/category/search-results">
              <DropdownMenuLabel className="text-base hover:bg-gray-100">Todas las categorias</DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (

                <DropdownMenuItem key={index} className="text-base hover:bg-gray-100 "  >
                  <Link href={`/category/${category.attributes.slug}`} className='w-full '>
                    <h2>{category.attributes.categoryName}</h2>
                  </Link>
                </DropdownMenuItem>
              ))}

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex gap-5 items-center '>
          <div className='relative flex items-center'>

            {isSearchOpen && (
              <div
                ref={searchBarRef}
                className={` top-0 left-0 flex justify-end bg-white dark:bg-[#19191A] rounded transform transition-all duration-300 ease-in-out z-20`}

              >
                <Search />
              </div>
            )}

            {/* Icono de búsqueda solo aparece cuando no está abierta la barra */}
            {!isSearchOpen && (
              <SearchIcon
                className="cursor-pointer dark:text-white"
                onClick={toggleSearch}
              />
            )}

          </div>

          <ul className={`absolute z-10 top-0 left-0 right-0 bottom-0 md:relative md:flex md:flex-row md:justify-center md:items-center ${isOpen ? 'flex flex-col mt-20 md:mt-0' : 'hidden'} md:flex space-x-4 md:space-x-6 md:mt-0 items-center md:absolute md:right-0`}>
          <div className='flex items-center justify-between gap-3 sm:gap-7'>
          <li className='relative'>
            <div
              className="text-black flex items-center cursor-pointer"
              onClick={handleCartClick}
            >
              <ShoppingCart className='dark:text-white' />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-white bg-[#3B82F6] rounded-full text-xs font-semibold">{cart.length}</span>
              )}
            </div>
            {openCart && (
              <CartModal closeModal={closeCartModal} />)} 
          </li>

          {/*Usuario*/}
          {/* <li className='relative'>
            <Link className="text-black flex items-center" href="/loved-products">
              <Heart
                className={` ${lovedItems.length > 0 ? 'fill-black dark:fill-white' : 'dark:text-white'}`}
              />
              {lovedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-white bg-[#3B82F6] rounded-full text-xs font-semibold">
                  {lovedItems.length}
                </span>
              )}
            </Link>
          </li> */}
              <li className='relative'>
                <div
                  className="text-black flex items-center cursor-pointer"
                  onClick={(e) => {
                    if (!isSignedIn) {
                      e.preventDefault(); // Evita la acción por defecto de navegar
                      router.push('/sign-in'); // Redirige a la página de inicio de sesión
                    } else {
                      router.push('/loved-products'); // Si está logueado, lo lleva a favoritos
                    }
                  }}
                >
                  <Heart
                    className={` ${lovedItems.length > 0 ? 'fill-black dark:fill-white' : 'dark:text-white'}`}
                  />
                  {lovedItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-white bg-[#3B82F6] rounded-full text-xs font-semibold">
                      {lovedItems.length}
                    </span>
                  )}
                </div>
              </li>


          <ToogleTheme />

          {isSignedIn && (
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='mt-1'>
              <Link href="/dashboard">

                <UserButton className="dark:text-white text-black" />

              </Link>
              {isModalOpen && (
                <div
                  className="absolute right-0 bg-white dark:bg-[#19191A]   p-4 w-48 rounded shadow-md mt-2 text-lg transition-opacity duration-200 ease-in-out"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                      <div className="flex items-center space-x-2 mb-2">
                        {/* <User2Icon /> */}
                        <p className="font-semibold dark:text-white">¡Hola, {user.firstName || 'Usuario'}!</p>
                      </div>
                  <Link href="/user-profile" className="block text-[#0A0A0A] hover:font-bold dark:text-[#B4B4B4]">Perfil </Link>
                  <Link href="/loved-products" className="block text-[#0A0A0A] hover:font-bold dark:text-[#B4B4B4]">Favoritos</Link>
                  <button onClick={handleLogout} className="block text-[#f83636] hover:font-bold ">Cerrar sesión</button>
                </div>
              )}
            </li>
          )}
          {!isSignedIn && (
            <li>
              <Link href="/sign-in">
                <User className="dark:text-white text-black " />
              </Link>
            </li>
          )}

          {/* <User /> */}


         
        
         
         
          </div>
          </ul>
        </div>
      </div>
    )
  );
}

export default Header