import Link from 'next/link'
import Image from 'next/image';


function PostCard({product}) {
  return (


    <Link href={`/products/${product.id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <Image className="w-full" src={product.image} alt={product.title} width={200} height={100} layout="responsive" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-900 font-bold">${product.price}</span>
      </div>
    </div>
    </Link>









  )
}

export default PostCard