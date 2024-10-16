'use client'

import Image from 'next/image'
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../../../lib/formatPrice';
import { useLovedProducts } from '@/context/UseLovedProducts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

function ProductItem({product, onAddToCart}) {


const { addLoveItem } = useLovedProducts();
const { isSignedIn } = useUser();
const router = useRouter();


const { attributes } = product;
const { discount, price, images, slug, productName} = attributes;

 // Calcular el precio con descuento (si aplica)
 const discountAmount = discount > 0 ? price * (discount / 100) : 0;
 const finalPrice = price - discountAmount;

  return (
    <Link href={`/products/${slug}`}>
    <div 
    className='p-2 md:p-6 flex flex-col items-center 
    justify-center gap-3 py-4 border border-gray-300 
    shadow-none h-full transition-all duration-300 
    ease-in-out hover:shadow-lg relative group'
    style={{ minHeight: '704px' }}
    // style={{maxWidth: '500px', margin: 'auto', minHeight: '460px' }} // Fijar el ancho máximo
    >
          {discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-[12px] z-50 rounded-full h-14 w-14 flex justify-center items-center">
              <p className="text-center">{discount}%OFF</p>   
             </div>
          )}
        <div className='relative flex items-center justify-center  overflow-hidden'>
         
          <Image
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`}
              alt={productName}
              width={400}
              height={256}
              layout="responsive"
            style={{ minHeight: "542px" }} // Altura mínima para la imagen
          />

          <div className="absolute w-full px-6 transition duration-200 
          opacity-0 group-hover:opacity-100 bottom-5 cursor-pointer">
              <div className="flex justify-center gap-x-6">
                  <Button
                      onClick={(e) => {
                          e.preventDefault();
                          onAddToCart();
                          // addToCart(product);
                      }}
                      aria-label="add to cart"
                      className="bg-white text-black hover:bg-black hover:text-white rounded-full p-2 flex items-center justify-center"
                  >
                      <ShoppingCart size={24} />
                  </Button>
                  <Button
                       onClick={(e) => {
                           e.preventDefault();
                          if(!isSignedIn){
                            router.push("sign-in")
                          }else{
                            addLoveItem(product);

                          }
                       }}
                      aria-label="add to favorites"
                      className="bg-white text-black hover:bg-black hover:text-white  rounded-full p-2 flex items-center justify-center"
                  >
                      <Heart size={24} />
                  </Button>
              </div>
          </div>
          </div>
          {/* <div className="flex justify-between gap-4 px-8 mt-3">
          
          <h3
              className="text-lg font-bold cursor-pointer"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis", // Limitar el nombre largo con "..."
                width: "100%",
              }}
          >
              {productName}
          </h3>
          </div>
         */}

<div className="flex flex-col gap-1 px-8 mt-1 w-full"> {/* Flex para que el título ocupe todo el espacio */}
          <h3
            className="text-lg  cursor-pointer text-left" 
            style={{
              wordWrap: "break-word",  // Permitir el salto de línea si el texto es largo
              width: "100%", // Asegurar que el título ocupe todo el ancho disponible
            }}
          >
            {productName}
          </h3>
        </div>


          <div className="flex flex-col gap-1 w-full px-8 ">
              {discount > 0 ? (
                  
                      <div className="flex flex-wrap items-center gap-2">
                         <span className="text-lg text-red-500 font-bold ">
                              {formatPrice(finalPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                              {formatPrice(price)}
                          </span>
                      </div>
                      
                  
              ) : (
                  <p className="text-lg font-bold">{formatPrice(price)}</p>
              )}
            
          </div>
          

    </div>
    </Link>
   
  )
}

export default ProductItem