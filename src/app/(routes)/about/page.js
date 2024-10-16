// pages/acerca-de.js
import Head from 'next/head';

export default function AcercaDe() {
  return (
    <>
      <Head>
        <title>Acerca de Nosotros - Indumentaria Brix</title>
        <meta name="description" content="Conoce más sobre Indumentaria Brix, nuestra historia, misión, visión y equipo." />
      </Head>

      <main className="bg-white text-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
          <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Acerca de <span className="text-yellow-400">Indumentaria Brix</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Conoce mas sobre nuestra misión, visión y el equipo que hace posible tu estilo.
              </p>
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
                  Nuestra misión es ofrecer productos que inspiren confianza y estilo en cada uno de nuestros clientes, brindando calidad, comodidad y elegancia en cada prenda que vendemos.
                </p>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
                <p className="text-lg text-gray-700">
                  Ser una marca reconocida internacionalmente por nuestra sostenibilidad, creatividad y por ofrecer productos que trasciendan las tendencias, permitiendo a cada persona encontrar su estilo único.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-8">Nuestro Equipo</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Miembro 1 */}
              <div className="text-center bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Miembro 1"
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl font-semibold text-gray-900">De La Fuente Ezequiel</h3>
                <p className="text-gray-500">Fundador</p>
              </div>
              {/* Miembro 2 */}
              <div className="text-center bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Miembro 2"
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl font-semibold text-gray-900">Reyes Exequiel</h3>
                <p className="text-gray-500">Fundador</p>
              </div>
              {/* Miembro 3 */}
              <div className="text-center bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Miembro 3"
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl font-semibold text-gray-900">Quintero Francisco</h3>
                <p className="text-gray-500">Fundador</p>
              </div>
              {/* Miembro 4 */}
              <div className="text-center bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Miembro 4"
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl font-semibold text-gray-900">Romero Fabio</h3>
                <p className="text-gray-500">Fundador</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
