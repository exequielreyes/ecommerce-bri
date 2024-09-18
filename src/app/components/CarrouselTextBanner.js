"use client";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
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
  pauseOnHover: true,  // Pausar al hacer hover
  adaptiveHeight: true, // Ajusta la altura dependiendo del contenido
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
    title: "Consigue hasta un -25% en compras superiores a $40,000",
    description: "-20% al gastar $100,000 o -25% al gastar $150,000. Usa el código BRIX",
    link: "#",
  },
  {
    id: 3,
    title: "Devoluciones y entregas gratuitas",
    description: "Como cliente, tienes envíos y devoluciones gratis en un plazo de 30 días en todos los pedidos",
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
    <div className="w-full bg-gray-200 dark:bg-primary">
      <Slider {...settings} className="w-full">
        {dataCarouselTop.map(({ id, title, link, description }) => (
          <div
            key={id}
            className="cursor-pointer w-full p-4"
            onClick={() => router.push(link)}
          >
            <div className="bg-transparent text-center">
              <p className="text-lg font-semibold dark:text-secondary">{title}</p>
              <p className="text-sm dark:text-secondary">{description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarrouselTextBanner;
