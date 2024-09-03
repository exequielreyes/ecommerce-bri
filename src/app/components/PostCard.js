
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

function PostCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="md:basis-1/2 lg:basis-1/3 group p-3 relative">
      <Link href={`/products/${product.id}`} passHref>
        <div className="py-4 border border-gray-200 shadow-none h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer">
          <div className="relative flex items-baseline justify-center px-6 py-2 h-96 overflow-hidden">
            <Image
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              src={product.image}
              alt="Image featured"
              width={400}
              height={256}
              layout="responsive"
            />
            
          </div>
          <div className="flex justify-between gap-4 px-8 mt-auto">
            <h3 className="text-lg font-bold">{product.title}</h3>
          </div>
        </div>
      </Link>
      {/* Asegurarse de que el botón del carrito no sea clickeable por el enlace */}
      <div
        className=" flex justify-center pointer-events-none absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-24"
      >
        <IconButton
          onClick={(event) => {
            event.stopPropagation(); // Evita que el clic se propague al enlace
            addToCart(product);
          }}
          aria-label="add to cart"
          className='bg-white text-black hover:bg-black hover:text-white pointer-events-auto'
        >
          <ShoppingCart size={28} />
        </IconButton>
      </div>
    </div>
  );
}

export default PostCard;




// "use client";

// import Link from 'next/link';
// import Image from 'next/image';
// import { useContext } from 'react';
// import { CartContext } from '../../context/CartContext';
// import { Expand, ShoppingCart } from 'lucide-react';
// import IconButton from '@mui/material/IconButton';
// import { useRouter } from 'next/navigation';

// function PostCard({ product }) {
//   const { addToCart } = useContext(CartContext);
//   const router = useRouter();

//   return (
 
//   <div className="md:basis-1/2 lg:basis-1/3 group p-3">
//     <Link href={`/products/${product.id}`} passHref>
//   <div className="py-4 border border-gray-200 shadow-none h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg">
    
//     <div className="relative flex items-baseline justify-center px-6 py-2 h-96 overflow-hidden">
//       <Image
//         className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
//         src={product.image}
//         alt="Image featured"
//         width={400}
//         height={256}
//         layout="responsive"
//       />
//       <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
//         <div className="flex justify-center gap-x-6">
          
//           {/* <IconButton
//             onClick={() => router.push(`products/${product.id}`)}
//             aria-label="expand"
//             className='bg-white'
//           >
//             <Expand size={20} className="text-black"/>
//           </IconButton> */}
//           <IconButton
//             onClick={() => addToCart(product)}
//             aria-label="add to cart"
//             className='bg-white text-black hover:bg-black hover:text-white'
//           >
//             <ShoppingCart size={28} />
//           </IconButton>
        
//         </div>
//       </div>
//     </div>
//     <div className="flex justify-between gap-4 px-8 mt-auto">
//       <h3 className="text-lg font-bold">{product.title}</h3>
//     </div>
  
//   </div>
//   </Link>
// </div>
//   );

// }

// export default PostCard;