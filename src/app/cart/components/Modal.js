import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-md  w-full relative">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2  text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white"
        >
          ✕
        </button>

        {/* Contenido del modal */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">En Mantenimiento</h1>
          <p className="text-lg text-gray-700 mb-8">
            Estamos trabajando para mejorar nuestra página.
          </p>
          <svg
            className="animate-spin h-10 w-10 mx-auto text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Modal;
