import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center w-full py-10 mt-20 space-y-10 md:space-y-0">
      {/* Primer bloque */}
      <div className="flex flex-col items-center max-w-xs text-center">
        <Image
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/payment.svg"
          alt="Elegí cómo pagar"
          width={64}
          height={64}
          className="mb-4 transition-transform transform hover:scale-110"
        />
        <h3 className="text-lg font-bold mb-2">Elegí cómo pagar</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Podés pagar con tarjeta, débito, efectivo o con Cuotas sin Tarjeta.
        </p>
        {/* <a href="#" className="text-blue-500 mt-2 hover:underline">Cómo pagar tus compras</a> */}
      </div>

      {/* Segundo bloque */}
      <div className="flex flex-col items-center max-w-xs text-center">
        <Image
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/shipping.svg"
          alt="Envío gratis"
          width={64}
          height={64}
          className="mb-4 transition-transform transform hover:scale-110"
        />
        <h3 className="text-lg font-bold mb-2">Envío gratis desde $ 80.000</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Solo por estar registrado en Indumentaria Brix tenés envíos gratis en algunos productos.
        </p>
      </div>

      {/* Tercer bloque */}
      <div className="flex flex-col items-center max-w-xs text-center">
        <Image
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/protected.svg"
          alt="Seguridad de principio a fin"
          width={64}
          height={64}
          className="mb-4 transition-transform transform hover:scale-110"
        />
        <h3 className="text-lg font-bold mb-2">Seguridad, de principio a fin</h3>
        <p className="text-gray-600 dark:text-gray-400">
          ¿No te gusta? ¡Devolvelo! En Indumentaria Brix, no hay nada que no puedas hacer, porque
          estás siempre protegido.
        </p>
        {/* <a href="#" className="text-blue-500 mt-2 hover:underline">Cómo te protegemos</a> */}
      </div>
    </div>
  );
}
