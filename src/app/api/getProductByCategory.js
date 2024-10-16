import { useEffect } from "react";
import { useState } from "react";

export function useGetProductByCategory(category) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[category][slug][$eq]=${category}&populate=*`
  
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      console.log("useEffect triggered"); // Para verificar si se ejecuta
      if (!category) return;

      console.log("Fetching products for brand:", category);
      console.log("API URL:", url);
  
      (async () => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const json = await res.json();
          console.log("API Response:", json); // Muestra la respuesta de la API
          setResult(json.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
          console.error("Error fetching products:", error);
        }
      })();
    }, [url, category]);
  
    return { loading, result, error };
}