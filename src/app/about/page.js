export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">En Mantenimiento</h1>
        <p className="text-lg text-gray-700 mb-8">
          Estamos trabajando para mejorar nuestra página. ¡Vuelve pronto!
        </p>
        <svg
          className="animate-spin h-10 w-10 mx-auto text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"/>
        </svg>
      </div>
    </div>
  );
}
