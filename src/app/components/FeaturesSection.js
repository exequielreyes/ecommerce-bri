import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div className="flex justify-around items-center w-full py-10 mt-20   ">
      {/* Primer bloque */}
      <div className="flex flex-col items-center max-w-xs">
        <Image
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/payment.svg"
          alt="Elegí cómo pagar"
          width={64}
          height={64}
          className="mb-4"
        />
        <h3 className="text-lg font-bold mb-2">Elegí cómo pagar</h3>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Podés pagar con tarjeta, débito, efectivo o con Cuotas sin Tarjeta.
        </p>
        <a href="#" className="text-blue-500 mt-2">Cómo pagar tus compras</a>
      </div>

      {/* Segundo bloque */}
      <div className="flex flex-col items-center max-w-xs">
        <Image
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/shipping.svg"
          alt="Envío gratis"
          width={64}
          height={64}
          className="mb-4 "
        />
        <h3 className="text-lg font-bold mb-2">Envío gratis desde $ 28.000</h3>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Solo por estar registrado en Mercado Libre tenés envíos gratis en miles de productos.
          Es un beneficio de Mercado Puntos.
        </p>
      </div>

      {/* Tercer bloque */}
      <div className="flex flex-col items-center max-w-xs">
        <Image
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/protected.svg"
          alt="Seguridad de principio a fin"
          width={64}
          height={64}
          className="mb-4 "
        />
        <h3 className="text-lg font-bold mb-2">Seguridad, de principio a fin</h3>
        <p className="text-center text-gray-600 dark:text-gray-400">
          ¿No te gusta? ¡Devolvelo! En Mercado Libre, no hay nada que no puedas hacer, porque
          estás siempre protegido.
        </p>
        <a href="#" className="text-blue-500 mt-2">Cómo te protegemos</a>
      </div>
    </div>
  );
}
