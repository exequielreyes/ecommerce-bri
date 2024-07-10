// import PostCard from "@/app/components/PostCard"
import Image from "next/image"

async function loadProduct(id){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    return data
}


async function Page({params}) {
   const post =  await loadProduct(params.idproduct)
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
      <Image className="w-full" src={post.image} alt={post.title} width={400} height={300} layout="responsive" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
      </div>
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <span className="text-gray-900 font-bold">${post.price}</span>
        <button class="btn btn-primary">Add to cart</button>
      </div>
    </div>
  )
}

export default Page