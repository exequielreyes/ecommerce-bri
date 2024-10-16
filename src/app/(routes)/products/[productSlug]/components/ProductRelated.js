import React from 'react';
import Image from 'next/image';
import { useGetProductByCategory } from '@/app/api/getProductByCategory';
import { formatPrice } from '../../../../../../lib/formatPrice';
import Link from 'next/link';

function ProductRelated({ currentProductSlug, currentProductCategory }) {
  const { loading, result: relatedProducts, error } = useGetProductByCategory(currentProductCategory);

  
  const filteredProducts = relatedProducts.filter(
    product => product.attributes.slug !== currentProductSlug
  );

  // Define la base URL de las imágenes
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <div className='mt-10'>
      <h2 className='text-2xl mb-5'>Productos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            // Construir la URL completa de la imagen
            const imageUrl = product.attributes.images.data[0]?.attributes.url
              ? `${baseUrl}${product.attributes.images.data[0].attributes.url}`
              : '';
            const price = product.attributes.price;
            const discount = product.attributes.discount || 0; 
            const discountAmount = price * (discount / 100);
            const finalPrice = price - discountAmount;

            return (
              <Link key={product.id} href={`/products/${product.attributes.slug}`}>
                <div className="border p-4 transition-all duration-100 rounded hover:shadow-md flex flex-col h-full items-start cursor-pointer group"> 
                  {imageUrl ? (
                    <div className='h-72 w-full relative flex-shrink-0'>
                      <Image 
                        src={imageUrl} 
                        alt={product.attributes.productName || 'Product Image'} 
                        layout="fill" // Usar 'fill' para ocupar todo el contenedor
                        objectFit="cover" 
                        className="rounded transition-transform duration-300 ease-in-out transform group-hover:scale-95" 
                      />
                    </div>
                  ) : (
                    <p>No image available</p>
                  )}
                  <h3 className="mt-2 text-base">{product.attributes?.productName || 'No name available'}</h3>
                  {discount > 0 ? (
                    <div>
                      <p className="text-gray-500 text-sm line-through">{formatPrice(price)}</p>
                      <div className='flex items-center'>
                        <p className="text-lg font-bold">{formatPrice(finalPrice)}</p>
                        <p className="ml-2 text-red-500">{discount}% OFF</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg font-bold">{formatPrice(price)}</p>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <p>No hay productos relacionados.</p>
        )}
      </div>
    </div>
  );
}

export default ProductRelated;
