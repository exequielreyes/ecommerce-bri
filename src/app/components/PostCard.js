"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function PostCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white ">
      <Link href={`/products/${product.id}`}>
        <div>
          <Image 
            className="w-full" 
            src={product.image} 
            alt={product.title} 
            width={200} 
            height={100} 
            layout="responsive" 
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.title}</div>
            <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
          </div>
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <span className="text-gray-900 font-bold">${product.price}</span>
            <button className="btn btn-primary">Ver producto</button>
          </div>
        </div>
      </Link>
     
    </div>
  )

}

export default PostCard;
