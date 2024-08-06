import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <SignUp
      appearance={{
        variables: {
           // Cambia el color primario
          colorButtonText: '#ffffff', // Cambia el color del texto del botón
          colorBackground: '#ffffff', // Cambia el color de fondo del formulario
          colorText: '#000000', // Cambia el color del texto
        },
        elements: {
          formButton: {
            backgroundColor: '#10b981', // Cambia el color del botón
            color: '#ffffff', // Cambia el color del texto del botón
          },
        },
      }}
      texts={{
        signInTitle: "Iniciar sesión en tu cuenta",
        signInSubtitle: "Por favor, ingresa tu correo y contraseña.",
        signInButton: "Iniciar sesión",
        forgotPassword: "¿Olvidaste tu contraseña?",
        // Puedes añadir más textos aquí
      }}
    />
  </div>
   );
}