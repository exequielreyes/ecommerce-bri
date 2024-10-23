import Head from "next/head";

export default function AcercaDe() {
  return (
    <>
      <Head>
        <title>Acerca de Nosotros - Indumentaria Brix</title>
        <meta
          name="description"
          content="Conoce más sobre Indumentaria Brix, nuestra historia, misión, visión y equipo."
        />
      </Head>

      <main className="bg-white text-gray-900">
        <section className="overflow-hidden bg-[url(https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop)] bg-cover bg-top bg-no-repeat">
          <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                NOSOTROS
              </h2>
              <br></br>
            </div>
          </div>
        </section>
        {/* Misión y Visión */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
                <p className="text-lg text-gray-700">
                  Ofrecer productos que inspiren confianza y estilo en cada uno
                  de nuestros clientes, brindando calidad, comodidad y elegancia
                  en cada prenda que vendemos.
                </p>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
                <p className="text-lg text-gray-700">
                  Ser una marca reconocida internacionalmente por nuestra
                  sostenibilidad, creatividad y por ofrecer productos que
                  trasciendan las tendencias, permitiendo a cada persona
                  encontrar su estilo único.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
      </main>
    </>
  );
}
