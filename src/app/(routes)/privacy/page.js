"use client";

import Head from "next/head";

const SecurityPolicies = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6">
    <Head>
      <title>Políticas de Seguridad</title>
      <meta
        name="description"
        content="Políticas de seguridad de nuestra empresa."
      />
    </Head>
    <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Políticas de Seguridad
      </h1>
      <section className="mb-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          La Ley de Protección de los Datos Personales (Ley N° 25.326) es una
          norma de orden público que regula la actividad de las bases de datos
          que registran información de carácter personal. Su objeto es
          garantizar a las personas el control del uso de sus datos
          personales. 
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          El titular de los datos personales tiene la facultad de
          ejercer el derecho de acceso a los mismos en forma gratuita a
          intervalos no inferiores a seis meses, salvo que se acredite un
          interés legítimo al efecto conforme lo establecido en el artículo
          14, inciso 3 de la Ley Nº 25.326.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          La DIRECCIÓN NACIONAL DE PROTECCIÓN DE DATOS PERSONALES, Órgano de
          Control de la Ley Nº 25.326, tiene la atribución de atender las
          denuncias y reclamos que se interpongan con relación al
          incumplimiento de las normas sobre protección de datos personales.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Indumentaria Brix ha adoptado los niveles de seguridad de protección de los
          Datos Personales legalmente requeridos, y ha instalado todos los
          medios y medidas técnicas a su alcance para evitar la pérdida, mal
          uso, alteración, acceso no autorizado y robo de los Datos Personales
          facilitados.
        </p>

        <h2 className="text-3xl font-bold mt-10 text-gray-800 dark:text-white">
          Política de Devoluciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Tiempo de cobertura</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong className="text-black" >Nuevos</strong><br />
              Tienes 30 días corridos para devolverlo desde que te llegó.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong className="text-black">Usados</strong><br />
              Tienes 10 días corridos para devolverlo desde que te llegó.
            </p>
          </div>

          <div className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Condiciones del producto</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong className="text-black">
              Si te arrepentiste de comprar el producto o es diferente de lo que pediste:
              </strong>
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
              <li>Debe estar en perfecto estado y no tener marcas de uso.</li>
              <li>Debe tener sus accesorios, manuales y etiquetas.</li>
              <li>Debe estar en el envoltorio original de la marca.</li>
              {/* <li>
                Si es celular, notebook, tablet o smartwatch no debe tener claves que impidan su uso, ni contener datos o fotos personales.
              </li> */}
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
            <strong className="text-black">
              Si el producto tiene un problema o está incompleto:
              </strong>
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
              <li>
                Cuando lo devuelvas y lo revisemos, debe estar en las mismas condiciones que describas al reclamar.
              </li>
              <li>Debe tener todos sus accesorios tal cual llegaron.</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mt-10">
          <strong>¿Qué pasa si devuelvo un producto que no cumple con estas condiciones?</strong>
          <br />
          Dependiendo del resultado de la revisión que hagamos del producto, podríamos enviarlo de vuelta o descontar una parte del reembolso.
        </p>

        <p className="text-gray-600 dark:text-gray-300 mt-4">
          <strong>¿Cuándo me reembolsan el dinero?</strong>
          <br/>
          Haremos el reembolso 3 días hábiles después de que llegue el producto, una vez que revisemos si cumple con las políticas de devolución.
        </p>

        <p className="text-gray-600 dark:text-gray-300 mt-4">
        <strong> ¿Dónde me reembolsarán el dinero?</strong>
        <br/>
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
          <li> Reembolsamos el dinero en el mismo medio de pago que usaste para comprar.</li>
          <li>   En algunos casos, hacemos el reembolso en Indumentary Brix si pagaste con tarjeta de crédito en una cuota o débito sin carrito de compras, para que recibas el dinero de forma inmediata, sin esperar.

          </li>
        </ul>
         
       
      </section>
    </main>
  </div>
  );
};

export default SecurityPolicies;
