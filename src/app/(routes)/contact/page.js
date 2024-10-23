"use client";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";

function ContactPage() {
  const [state, handleSubmit] = useForm("xpwzaepa");

  // Si la respuesta es exitosa, mostramos un mensaje de agradecimiento.
  if (state.succeeded) {
    return (
      <div className="text-center py-12">
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          Gracias por comunicarte con nosotros. Te responderemos pronto.
        </p>
        <Image
          src="/graciasporComunicarte.jpg"
          width={400}
          height={400}
          alt="Gracias por comunicarte con nosotros"
          className="m-auto"
        />
      </div>
    );
  }

  return (
    <section className="py-10 bg-white dark:bg-gray-900 flex justify-center items-center">
      <div className="w-full max-w-3xl mx-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center">
          Contáctanos
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-3 text-center">
          No dude en hacernos llegar sus consultas o sugerencias a través del
          siguiente formulario.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-6 border border-gray-200 dark:border-gray-700">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Campo de Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ingrese su nombre"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            {/* Campo de Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            {/* Campo de Mensaje */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                className="mt-1 block w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            {/* Botón de Enviar */}
            <div className="text-center">
              <button
                type="submit"
                disabled={state.submitting}
                className="inline-block bg-[#3B82F6] text-white font-semibold py-3 px-6 rounded-lg text-sm hover:bg-[#3B82F6]/80 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/80"
              >
                {state.submitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
