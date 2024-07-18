"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function PostCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 transition duration-300 ease-in-out transform hover:scale-105 w-full max-w-xs">
    <Link href={`/products/${product.id}`} passHref>
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
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-black no-underline">{product.title}</div>
          {/* <p className="text-gray-700 text-base line-clamp-3">{product.description}</p> */}
          <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 font-bold">${product.price}</span>
        </div>
      </div>
      </div>
    </Link>
  </div>
  )

}

export default PostCard;
