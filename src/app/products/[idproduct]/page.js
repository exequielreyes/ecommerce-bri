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
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={400} 
                    height={300} 
                    layout="responsive"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h1 className="card-title">{post.title}</h1>
                    <p className="card-text">{post.description}</p>
                    
                    <ProductPageClient product={post} />
                  </div>
                </div>
              </div>
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





