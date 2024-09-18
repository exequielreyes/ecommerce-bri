import React, { useContext } from "react";
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from "@mui/material";
import { X } from "lucide-react";
// import { useCart } from "@/context/CartContext";
import { CartContext } from "@/context/CartContext";
import { useLovedProducts } from "@/context/UseLovedProducts";
import { formatPrice } from "../../../../lib/formatPrice";
import { useRouter } from "next/navigation";

function LovedItemProduct({ product }) {
  const router = useRouter();
  const { removeLovedItem } = useLovedProducts();
//   const { addItem } = useCart();
const { addToCart } = useContext(CartContext);


const imageUrl = product.attributes?.images?.data?.[0]?.attributes?.url
? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
: '/default-image.jpg';


  // const addToCheckout = () => {
  //   addToCart(product);
  // };
  const removeToCheckout = () => {
    removeLovedItem(product.id);
  }

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      {/* Imagen del producto */}
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={imageUrl}
        alt={product.attributes.productName}
      />
      
      {/* Contenido del producto */}
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {product.attributes.productName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {formatPrice(product.attributes.price)}
        </Typography>

        {/* Botón para añadir al carrito */}
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => addToCart(product)}>
          Añadir al carrito
        </Button>
      </CardContent>

      {/* Botón para eliminar el producto */}
      <IconButton
        edge="end"
        color="secondary"
        onClick={removeToCheckout}
        sx={{ alignSelf: "center", mr: 2 }}
      >
        <X size={20} />
      </IconButton>
    </Card>
  );
}

export default LovedItemProduct;
