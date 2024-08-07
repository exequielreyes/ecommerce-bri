import PostCard from "../components/PostCard"
import { Skeleton, Grid } from '@mui/material';

//traigo los productos
async function loadProduct(){
  const res = await fetch("https://fakestoreapi.com/products")
  const data = await res.json()
  return data;
}



async function Products() {
 
const  products = await loadProduct()

  return(
 //muestro los productos 
 <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold text-center my-8"> Todos los Productos</h1>
 <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
    {/* descomentar por si no funciona lo otro
     {
    products.map((product) =>(
        <PostCard product={product} key={product.id} />
    ))} */}

      {products.length === 0 ? (
          // Mostrar Skeleton mientras los productos se cargan
          Array.from(new Array(6)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" width={300} height={400} />
            </Grid>
          ))
        ) : (
          products.map((product) => (
            <PostCard product={product} key={product.id} />
          ))
        )}

    </div>
    </div>
    );
}

export default Products