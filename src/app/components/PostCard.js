"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Expand, ShoppingCart } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';

function PostCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  return (
  //descomentar si da problema lo otro 
  //  <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 transition duration-300 ease-in-out transform hover:scale-105 w-full max-w-xs">
  //   <Link href={`/products/${product.id}`} passHref>
  //     <div>
  //       <div className="w-full h-64 overflow-hidden">
  //         <Image
  //           className="w-full h-full object-cover"
  //           src={product.image}
  //           alt={product.title}
  //           width={400}
  //           height={256}
  //           layout="responsive"
  //         />
  //       </div>
  //       <div className="px-6 py-4">
  //         <div className="font-bold text-xl mb-2 text-black no-underline">{product.title}</div>
  //         {/* <p className="text-gray-700 text-base line-clamp-3">{product.description}</p> */}
  //         <div className="flex items-center justify-between mt-4">
  //         <span className="text-gray-900 font-bold">${product.price}</span>
  //       </div>
  //     </div>
  //     </div>
  //   </Link>
  // </div>
  <div className="md:basis-1/2 lg:basis-1/3 group p-3">
  <div className="py-4 border border-gray-200 shadow-none h-full flex flex-col">
    <div className="relative flex items-center justify-center px-6 py-2 h-96 overflow-hidden">
      <Image
        className="object-cover w-full h-full"
        src={product.image}
        alt="Image featured"
        width={400}
        height={256}
        layout="responsive"
      />
      <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
        <div className="flex justify-center gap-x-6">
          
          <IconButton
            onClick={() => router.push(`products/${product.id}`)}
            aria-label="expand"
            className='bg-white'
          >
            <Expand size={20} className="text-black"/>
          </IconButton>
          <IconButton
            onClick={() => addToCart(product)}
            aria-label="add to cart"
            className='bg-white'
          >
            <ShoppingCart size={20} className="text-black" />
          </IconButton>
        
        </div>
      </div>
    </div>
    <div className="flex justify-between gap-4 px-8 mt-auto">
      <h3 className="text-lg font-bold">{product.title}</h3>
    </div>
  </div>
</div>
  );

}

export default PostCard;
