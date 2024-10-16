'use client'
import { X } from "lucide-react";
import React, { Component } from "react";
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components';
import { useUser } from '@clerk/nextjs';
import ChatComponent from "./ChatComponent";

const DiseñoChat = {
    background: '#f5f8fb',
    fontFamily: 'Inter, sans-serif',
    headerBgColor: '#3B82F6',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3B82F6',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };


  export default function MainChatBot({ onClose }) {

    const { user } = useUser(); 
    // Usar la propiedad imageUrl para obtener la imagen de perfil
    const userProfileImage = user && user.imageUrl ? user.imageUrl : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTIwOC41IDIxIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii0yMDguNSAyMSAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PGNpcmNsZSBjeD0iLTE1OC41IiBjeT0iNzEiIGZpbGw9IiNGNUVFRTUiIGlkPSJNYXNrIiByPSI1MCIvPjxnPjxkZWZzPjxjaXJjbGUgY3g9Ii0xNTguNSIgY3k9IjcxIiBpZD0iTWFza18yXyIgcj0iNTAiLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzRfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18yXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIiBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyICAgICBjMC0xLjcsMC02LjMsMC02LjNoLTE1aC0xNWMwLDAsMCw0LjYsMCw2LjNjMCw4LjctNC41LDExLjMtNywxMmMtNi44LDEuOS0yOC4xLDcuMy0yOC4xLDYuN3YxNGg1MC4xSC0xMDguNXoiIGZpbGw9IiNFNkMxOUMiIGlkPSJNYXNrXzNfIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIj48ZGVmcz48cGF0aCBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyYzAtMS43LDAtNi4zLDAtNi4zaC0xNWgtMTVjMCwwLDAsNC42LDAsNi4zICAgICAgIGMwLDguNy00LjUsMTEuMy03LDEyYy02LjgsMS45LTI4LjEsNy4zLTI4LjEsNi43djE0aDUwLjFILTEwOC41eiIgaWQ9Ik1hc2tfMV8iLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzVfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18xXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNV8pIiBkPSJNLTE1OC41LDEwMC4xYzEyLjcsMCwyMy0xOC42LDIzLTM0LjQgICAgICBjMC0xNi4yLTEwLjMtMjQuNy0yMy0yNC43cy0yMyw4LjUtMjMsMjQuN0MtMTgxLjUsODEuNS0xNzEuMiwxMDAuMS0xNTguNSwxMDAuMXoiIGZpbGw9IiNENEIwOEMiIGlkPSJoZWFkLXNoYWRvdyIvPjwvZz48L2c+PHBhdGggZD0iTS0xNTguNSw5NmMxMi43LDAsMjMtMTYuMywyMy0zMWMwLTE1LjEtMTAuMy0yMy0yMy0yM3MtMjMsNy45LTIzLDIzICAgIEMtMTgxLjUsNzkuNy0xNzEuMiw5Ni0xNTguNSw5NnoiIGZpbGw9IiNGMkNFQTUiIGlkPSJoZWFkIi8+PC9nPjwvc3ZnPg=='; 


    const validarNombre = (value) => {
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      if (formattedValue.length > 15) {
        return 'El nombre debe tener máximo 15 caracteres.';
      }
      if (/\d/.test(formattedValue)) {
        return 'El nombre no puede contener números.';
      }
      return true;
    }

    return (
      <div className="relative">
        
        <ThemeProvider theme={DiseñoChat}>
       <button 
          onClick={onClose} 
          className=" absolute top-[0.45rem] -right-[0.70rem]  text-white hover:text-black p-2 rounded-full z-[1000]" // Estilos para el botón de cerrar
        >
          <X />
        </button>
          <ChatBot
            headerTitle="BrixBot"
            userAvatar={userProfileImage} 
            placeholder={"Escribe el mensaje"}
            // floating={true}
            //  speechSynthesis={{enable: true}}
            steps={[
              {
                id: 'intro',
                message: 'Bienvenido a BrixBot. ¿Cómo te llamas?',
                trigger: '1',
              },
              {
                id: '1',
                user: true,
                validator: validarNombre,
                trigger: '2',
              },
              {
                id: '2',
                message: 'Encantado de conocerte {previousValue}',
                trigger: '3',
              },
              {
                id: '3',
                message: '¿En qué puedo ayudarte hoy?',
                trigger: 'seleccion',
              },
              {
                id: 'seleccion',
                options: [
                  { value: "b", label: 'Buscar productos', trigger: 'buscarProductos' },
                  // { value: 'recomendaciones', label: 'Obtener recomendaciones', trigger: 'recomendaciones' },
                   { value: "t", label: 'Información sobre talles', trigger: 'talles' },
                   { value: "e", label: 'Información sobre envíos', trigger: 'envios' },
                   { value: "d", label: 'Política de devoluciones', trigger: 'devoluciones' },
                  // { value: 'contacto', label: 'Contactar con soporte', trigger: 'contacto' },
                ],
              },

              { id: 'buscarProductos', message: '¿Qué tipo de prenda estás buscando? (Ejemplo: camisetas, pantalones)', trigger: 'seleccionProduct' },
              
              {
                id: 'seleccionProduct',
                options: [
                    { value: 'remeras', label: 'Remeras', trigger: 'buscarResultado' },
                    { value: 'pantalones', label: 'Pantalones', trigger: 'buscarResultado' },
                    { value: 'buzos', label: 'Buzos', trigger: 'buscarResultado' },
                    { value: 'camperas', label: 'Camperas', trigger: 'buscarResultado' },
                    { value: 'short', label: 'Short', trigger: 'buscarResultado' },
                    { value: 'calzas', label: 'Calzas', trigger: 'buscarResultado' },
                    { value: 'musculosas', label: 'Musculosas', trigger: 'buscarResultado' },
                   
                ],
            },
              
            {
              id: 'buscarResultado',
              component: <ChatComponent  />,
              asMessage: true,
              trigger: 'preguntaVuelta',
          },
            
              {
                id: 'talles',
                message: '¿Te gustaría saber cómo elegir el talle correcto o consultar nuestra guía de tallas?',
                trigger: 'selecionTalles',
              },
              {
                id: 'selecionTalles',
                options: [
                  { value: 'elegir', label: 'Cómo elegir el talle correcto', trigger: 'explicacionTallas' },
                  { value: 'guia', label: 'Ver guía de talles', trigger: 'guiaTallas' },
                ],
              },
              {
                id: 'explicacionTallas',
                message: 'Para elegir el talle correcto, te recomendamos medir tu busto, cintura y cadera. Luego, compáralo con nuestra tabla de talles.',
                trigger: 'preguntaVuelta',
              },
              {
                id: 'guiaTallas',
                message: 'Puedes consultar nuestra guía de talles aquí: [Enlace a guía de tallas].',
                trigger: 'preguntaVuelta',
              },
              {
                id: 'envios',
                message: 'Ofrecemos envíos nacionales e internacionales. El tiempo de entrega depende de tu ubicación. ¿Te gustaría saber más sobre los costos o el tiempo de entrega?',
                trigger: 'opcionesEnvio',
              },
              {
                id: 'opcionesEnvio',
                options: [
                  { value: 'costos', label: 'Costos de envío', trigger: 'costosEnvio' },
                  { value: 'tiempo', label: 'Tiempo de entrega', trigger: 'tiempoEnvio' },
                ],
              },
              {
                id: 'costosEnvio',
                message: 'El costo del envío varía según la ubicación. Los envíos dentro del país tienen un costo de $X, mientras que los envíos internacionales cuestan $Y.',
                trigger: 'preguntaVuelta',
              },
              {
                id: 'tiempoEnvio',
                message: 'Los envíos nacionales tardan entre 3-5 días hábiles. Los envíos internacionales pueden tardar entre 7-15 días hábiles.',
                trigger: 'preguntaVuelta',
              },
              {
                id: 'devoluciones',
                message: 'Nuestra política de devoluciones permite que devuelvas productos dentro de los 30 días posteriores a la compra, siempre que estén en su estado original.',
                trigger: 'preguntaVuelta',
              },
              {
                id: 'contacto',
                message: 'Si tienes algún problema, puedes contactarnos por email a contacto@tiendaropa.com o llamar al +123 456 789.',
                trigger: 'preguntaVuelta',
              },

              {
                id: 'preguntaVuelta',
                message: '¿Necesitas algo más?',
                trigger: '8',
              },
              {
                id: '8',
                options: [
                  { value: 'yes', label: 'Sí, necesito más ayuda', trigger: '3' },
                  { value: 'no', label: 'No gracias', trigger: 'finCHAT' },
                ],
              },
              {
                id: 'finCHAT',
                message: 'Estupendo, ¡Ten un buen día!',
                end: true,
              },
            ]}
          />
        </ThemeProvider>
      </div>
    );
  
}