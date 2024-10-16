"use client";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";

function ContactPage() {
  const [state, handleSubmit] = useForm("xpwzaepa");
  if (state.succeeded) {
    return (
      <div className="text-center  ">
        <p className=" mb-8 text-lg ">
          Gracias por comunicarte con nosotros, te responderemos pronto!
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
    <section className="py-10 bg-white-100 flex justify-around">
      <div className="w-1/2 mx-4">
        <h2 className=" text-start  font-nova   text-2xl">Contáctame</h2>

        <p className="text-start   text-xl mt-5">
          Sientase libre de consultar cualquier sugerencia en el siguiente
          formulario
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mt-6 dark:bg-[#19191A]">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-base font-bold dark:text-[#B4B4B4]"
              >
                Nombre
              </label>
            </div>

            <div>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ingrese su nombre"
                className="ring-1 ring-gray-300 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2"
                required
              />

              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-base font-bold dark:text-[#B4B4B4]"
              >
                Email
              </label>
            </div>

            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su correo electronico"
                className="ring-1 ring-gray-300 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2"
              />

              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-base font-bold dark:text-[#B4B4B4]"
              >
                Mensaje
              </label>
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                required
                className="ring-1 ring-gray-300 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 resize-none"
              />

              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="inline-block self-end  bg-violet-500   hover:bg-indigo-600 text-white font-bold px-6 py-4 rounded-lg text-sm"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
