'use client'
import { UserProfile, useAuth, RedirectToSignIn } from "@clerk/nextjs";

function DashboardPage() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return <RedirectToSignIn />;
  }
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <UserProfile
        appearance={{
          variables: {
            colorBackground: '#ffffff', 
            colorText: '#2d3748', 
            colorButtonText: '#ffffff', // Color del texto del botón
          },
          elements: {
            formButton: {
              backgroundColor: '#4a90e2', 
              color: '#ffffff', 
              borderRadius: '8px', 
              padding: '12px 24px', 
            },
            input: {
              backgroundColor: '#f7fafc', 
              borderColor: '#cbd5e0', 
              borderRadius: '4px', 
              padding: '10px', 
            },
            inputLabel: {
              color: '#4a5568', 
            },
          },
        }}
      />
    </div>
  );
}

export default DashboardPage;
