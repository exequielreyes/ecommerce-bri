import PostCard from "./components/PostCard";

//de esta forma mostramos los producto en la pagina de inicio
async function fetchProduct() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data.slice(0, 6); //Devuelve los primeros 6 productos de la api
}

export default async function Home() {
  const products = await fetchProduct();

  return (
     <div className="container mx-auto p-4">
      <h1 className="text-2xl   my-8">Productos destacados</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
        {products &&
          products.map((product) => (
            <PostCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
