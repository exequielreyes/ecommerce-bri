export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
  
    if (q) {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
  
        const results = products.filter((product) => {
          const { title } = product;
          return title.toLowerCase().includes(q.toLowerCase());
        });
  
        return new Response(JSON.stringify(results), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching products from FakeStore API' }), { status: 500 });
      }
    }
  
    return new Response(JSON.stringify({ error: 'No search query provided' }), { status: 400 });
  }
  