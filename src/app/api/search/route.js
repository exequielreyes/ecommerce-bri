export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (q) {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[productName][$contains]=${q}&populate=*`;
      const response = await fetch(url);
      const products = await response.json();

      const results = products.data.map((product) => {
        const imageUrl = product.attributes.images?.data?.[0]?.attributes?.url || ''; 
        return {
          // id: product.id,
          slug: product.attributes.slug,
          title: product.attributes.productName,
          images: imageUrl, // Usar la URL corregida
          price: product.attributes.price,
           
        };
      });

      return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error fetching products from Strapi' }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ error: 'No search query provided' }), { status: 400 });
}









//CODIGO ANTERIOR FUNCIONANDO
// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get('q');
  
//     if (q) {
//       try {
//         const response = await fetch('https://fakestoreapi.com/products');
//         const products = await response.json();
  
//         const results = products.filter((product) => {
//           const { title } = product;
//           return title.toLowerCase().includes(q.toLowerCase());
//         });
  
//         return new Response(JSON.stringify(results), { status: 200 });
//       } catch (error) {
//         return new Response(JSON.stringify({ error: 'Error fetching products from FakeStore API' }), { status: 500 });
//       }
//     }
  
//     return new Response(JSON.stringify({ error: 'No search query provided' }), { status: 400 });
//   }
  