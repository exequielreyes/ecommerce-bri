"use client";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import { Card, CardContent } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Configuración del carrusel
const settings = {
  dots: true,
  infinite: true,
  speed: 1000, // Aumenta la velocidad de transición
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000, // Ajusta el intervalo de autoplay
};

export const dataCarouselTop = [
  {
    id: 1,
    title: "Envios en 24/48 h",
    description: "Dependiendo tu zona los envios seran entre 24/48 horas, Obten mas informacion",
    link: "#",
  },
  {
    id: 2,
    title: "Consigue hasta un -25% en compras superiores a 40€",
    description: "-20% al gasta 100€ o -25% al gastar 150€. Usa el codigo BRIX",
    link: "#",
  },
  {
    id: 3,
    title: "Devoluciones y entregas gratuitas",
    description: "Como cliente, tienes envios y devoluciones gratis en un plazo de 30 dias en todos los pedidos",
    link: "#",
  },
  {
    id: 4,
    title: "Comprar novedades",
    description: "Todas las novedades al 50% de descuento",
    link: "#",
  },
];

function CarrouselTextBanner() {
  const router = useRouter();

  return (
    <div className=" w-full    bg-gray-200 dark:bg-primary">
      <Slider {...settings} className="w-full">
        {dataCarouselTop.map(({ id, title, link, description }) => (
          <div key={id} className="cursor-pointer w-full" onClick={() => router.push(link)} >
            <Card className="shadow-none border-none bg-transparent w-full">
              <CardContent className="flex flex-col justify-center p-2 items-center text-center w-full">
                <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarrouselTextBanner;
