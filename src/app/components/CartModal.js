
/* eslint-disable @next/next/no-img-element */
import { CartContext } from '@/context/CartContext'
import React, { useContext, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CartModal({ closeModal }) {
  const { cart, removeFromCart } = useContext(CartContext)

  // useEffect(() => {
  //   cart && console.log(cart)
  // }, [cart])



  const modalRef = useRef(null)

  useEffect(() => {
    // Cerrar el modal si se hace clic fuera de él
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Cierra el modal si se hace clic fuera
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeModal])





  return (
    <div  ref={modalRef} className='h-[300px] w-[273px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-[-2.5rem] top-8 p-5 overflow-auto'>
      {cart.length === 0 ? (
        // Mostrar este mensaje cuando el carrito esté vacío
        <div className="h-full flex items-center justify-center">
          <p className='text-center text-gray-700'>No hay productos en el carrito.</p>
        </div>
      ) : (
        // Mostrar el contenido del carrito cuando haya productos
        <>
          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
              {cart.map((item, index) => {
                const imageUrl = item?.attributes?.images?.data?.[0]?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.attributes.images.data[0].attributes.url}`
                  : '/default-image.jpg'; // Imagen por defecto si no hay URL

                return (
                  <li key={index} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item?.attributes?.productName || "Sin título"}
                        layout="fill"
                        objectFit="contain"
                        className="rounded"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-900 line-clamp-1">{item.attributes?.productName || "Nombre no disponible"}</h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Cantidad: {item.quantity}</dt>
                        </div>

                        <div>
                          <dt className="inline">Color: {item.attributes?.color}</dt>
                        </div>
                      </dl>
                    </div>
                    <button
                      onClick={() => removeFromCart({id:item.id, size: item.size})}
                      className="text-gray-600 transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="space-y-4 text-center mt-5">
            <Link
              href="/cart"
              className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
              Ver el carrito ({cart?.length})
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default CartModal;
