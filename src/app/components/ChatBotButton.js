'use client'
import React, { useState } from "react";
import MainChatBot from "./MainChatBot";// Importa tu chatbot aquí
import { MessageCircle } from "lucide-react";

const ChatBotButton = () => {
  const [isChatBotOpen, setChatBotOpen] = useState(false); // Estado para controlar la apertura del chatbot
  const [isHovering, setIsHovering] = useState(false);
  


  const toggleChatBot = () => {
    setChatBotOpen((prev) => !prev); // Cambiar el estado de apertura
  };

  const closeChatBot = () => {
    setChatBotOpen(false);
  };


  return (
    <>
      {/* Contenedor del botón y el mensaje de ayuda con fondo común */}
      <div
        className={`fixed bottom-14 right-8 flex items-center bg-blue-500 rounded-full cursor-pointer shadow-lg transition-all duration-300 ease-in-out ${
          isHovering ? "p-4 pl-6" : "p-3"
        }`}
        onMouseEnter={() => setIsHovering(true)} // Mostrar el mensaje al pasar el mouse
        onMouseLeave={() => setIsHovering(false)} // Ocultar el mensaje al salir el mouse
        onClick={toggleChatBot} // Hacer clic en cualquier parte del contenedor para abrir el chat
      >
        {/* Mensaje de ayuda */}
        {isHovering && (
          <div
            className="text-white text-sm mr-2 transition-opacity duration-300 ease-in-out"
            style={{ whiteSpace: "nowrap" }} // Evitar que el texto se corte
          >
            ¿Necesitas ayuda?
          </div>
        )}

        {/* Botón del ChatBot */}
        <button
          className="bg-blue-500 text-white rounded-full flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* ChatBot */}
      {isChatBotOpen && (
        <div className="fixed bottom-0 right-0 m-4 w-80 z-50">
          <MainChatBot onClose={closeChatBot} />
        </div>
      )}
    </>
  );
};

export default ChatBotButton;