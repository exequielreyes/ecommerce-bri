import PostCard from "./components/PostCard";


//de esta forma mostramos los producto en la pagina de inicio
async function fetchProduct(){
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data
}


export default async  function Home() {
    const products = await fetchProduct()
return(
    <div>
        {products && products.map((product) =>(
            <PostCard key={product.id} product={product} />
        ))}

    </div>
)
}
