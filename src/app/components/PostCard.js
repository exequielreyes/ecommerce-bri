"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function PostCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 transition duration-300 ease-in-out transform hover:scale-105 w-full max-w-xs">
    <Link href={`/products/${product.id}`}>
      <div>
        <div className="w-full h-64 overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={product.image}
            alt={product.title}
            width={400}
            height={256}
            layout="responsive"
          />
        </div>
        <div className="py-4">
          <div className=" text-xl mb-2">{product.title}</div>
          {/* <p className="text-gray-700 text-base line-clamp-3">{product.description}</p> */}
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 text-2xl font-bold">${product.price}</span>
          <button className="inline-block bg-blue-500 text-white text-center px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">Ver producto</button>
        </div>
      </div>
      </div>
    </Link>
  </div>
  )

}

export default PostCard;
