// import PostCard from "@/app/components/PostCard"

import Image from "next/image";
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import ProductPageClient from "../[idproduct]/ProductPageClient";
import 'bootstrap/dist/css/bootstrap.min.css';

async function loadProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { idproduct } = params;

  try {
    const post = await loadProduct(idproduct);

    return (
      <div className="container mx-auto mt-4">
        <div className="mb-4 text-start">
          <h2 className="text-lg text-sky-600">{post.category} &gt; {post.title}</h2> {/* Mostrar la categoría */}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start">
          <div className="md:w-1/2">
            <Image 
              src={post.image} 
              alt={post.title} 
              width={500} 
              height={400} 
              layout="responsive"
            />
          </div>
          <div className="md:w-1/2 p-4">
            <div className="card-body">
              <h1 className="card-title text-2xl font-bold mb-4">{post.title}</h1>
              <p className="card-text mb-4">{post.description}</p>
              {/* <p className="text-xl font-semibold mb-4">${post.price}</p> */}
              <ProductPageClient product={post} />
            </div>
          </div>
        </div>
      </div>

    );
  } catch (error) {
    return (
      <div className="text-center">
        <p>No se pueden recuperar los detalles del producto. Por favor, inténtelo de nuevo más tarde.</p>
      </div>
    );
  }
}





