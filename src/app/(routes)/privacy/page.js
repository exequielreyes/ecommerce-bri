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
        </section>
      </main>
    </div>
  );
};

export default SecurityPolicies;
