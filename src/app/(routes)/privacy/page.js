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
          <p className="text-gray-600 dark:text-gray-300 mt-10">
          Los productos pueden devolverse gratis, sin importar el motivo. 

Solo hay algunos productos específicos que no tienen devolución. En ese caso, vas a poder acordar una solución con el vendedor iniciando un reclamo si lo necesitás.

¿Cuáles son los requisitos para devolver un producto?
Tiempo de cobertura
Condiciones del producto
Nuevos

Tienes 30 días corridos para devolverlo desde que te llegó.

Usados

Tienes 10 días corridos para devolverlo desde que te llegó.

Si te arrepentiste de comprar el producto o es diferente de lo que pediste:

- Debe estar en perfecto estado y no tener marcas de uso.

- Debe tener sus accesorios, manuales y etiquetas.

- Debe estar en el envoltorio original de la marca.

- Si es celular, notebook, tablet o smartwatch no debe tener claves que impidan su uso, ni contener datos o fotos personales.

Si el producto tiene un problema o está incompleto:

- Cuando lo devuelvas y lo revisemos, debe estar en las mismas condiciones que describas al reclamar.

- Debe tener todos sus accesorios tal cual llegaron.

¿Qué pasa si devuelvo un producto que no cumple con estas condiciones?
Dependiendo del resultado de la revisión que hagamos del producto, podríamos enviarlo de vuelta o descontar una parte del reembolso.

¿Cuándo me reembolsan el dinero?
Haremos el reembolso 3 días hábiles después de que llegue el producto, una vez que revisemos si cumple con las políticas de devolución. Sin embargo, algunas veces podemos hacer el reembolso ni bien entregás el producto, para que tengas el dinero más rápido.

Una vez que hagamos el reembolso, vas a ver todos los detalles sobre el monto, lugar y día de acreditación del dinero desde el estado de tu compra. 

Para más información podés consultar los plazos de acreditación de cada medio de pago.

¿Dónde me reembolsarán el dinero?
Reembolsamos el dinero en el mismo medio de pago que usaste para comprar. 
En algunos casos, hacemos el reembolso en Mercado Pago si pagaste con tarjeta de crédito en una cuota o débito sin carrito de compras, para que recibas el dinero de forma inmediata, sin esperar.
          </p>
        </section>
      </main>
    </div>
  );
};

export default SecurityPolicies;
