// 'use client';
// import React, { useState } from 'react';

// function Faq() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [activeSection, setActiveSection] = useState(null);

//   const sections = [

//     {
//       title: "Pagos",
//       faqs: [
//         {
//           question: "¿Cuáles son los medios de pago disponibles?",
//           answer: "Podrás abonar tus pedidos con Tarjeta de Crédito/debito o por Mercado Pago a través de Cupones de Pago.",
//         },
//         {
//           question: "¿Es seguro pagar con mi tarjeta de crédito en IndumentaryBrix?",
//           answer: "Sí, es seguro. Entendemos que la seguridad de tu información personal es de suma importancia para vos. Cumplimos con el estándar internacional de protección de datos, para que tu información personal y de tarjeta de crédito, esté protegida de accesos no autorizados.",
//         },
       
//         {
//           question: "¿Cómo sé que mi pago fue acreditado?",
//           answer: "Una vez que tu pago haya sido acreditado correctamente por administración, recibirás un correo electrónico informándote el número de acreditación y el número de factura correspondiente.",
//         },
//       ],
//     },
//     {
//       title: "Envío y Retiro",
//       faqs: [
//         {
//           question: "¿Cuáles son las formas de envío?",
//           answer: "Envíos a domicilio: Envíos a cualquier punto del país",
//         },
//         {
//           question: "¿Cuál es el costo del envío?",
//           answer: (
//             <div>
//               <p>El costo de envío puede variar según la ubicación y el método de envío elegido. A continuación, se detallan los precios por región:</p>
//               <ul className="list-disc pl-5">
//                 <li>La Rioja $2.000*</li>
//                 <li> PBA desde $5.499*</li>
//                 <li> CENTRO desde $5.499*</li>
//                 <li> CUYO desde $5.499*</li>
//                 <li> NOA desde $6.499*</li>
//                 <li> NEA desde $6.499*</li>
//                 <li>PATAGONIA desde $6.999*</li>
//                 <li>CABA desde $5.999*</li>
//                 <li>CÓRDOBA CAPITAL desde $6.999*</li>
//                 <li>ROSARIO desde $6.999*</li>
//                 <li>MENDOZA CIUDAD desde $6.999*</li>
//                 <li>PARANÁ desde $6.999*</li>
//                 <li>SANTA FE desde $6.999*</li>
//                 <li>SAN JUAN desde $6.999*</li>
//                 <li>SAN LUIS desde $6.999*</li>
//                 <li>BAHÍA BLANCA desde $6.999*</li>  
//               </ul>
//             </div>
//           ),
          
//         },
//         {
//           question: "¿Cuánto tarda en llegar mi pedido?",
//           answer: "El tiempo de entrega depende de la disponibilidad del producto, del tiempo de envío y de la aprobación del medio de pago. Los días que se indiquen son estimativos, y corren siempre a partir del momento en que el pago es aprobado. Los envíos se realizan en toda la República Argentina",
//         },
//         {
//           question: "¿En qué días y horarios entregan los pedidos?",
//           answer: "Las entregas a domicilio se realizan de lunes a viernes de 8 hs a 00 hs. No se entregan pedidos fines de semana ni feriados.",
//         },
//         {
//           question: "¿Puede recibir mi pedido otra persona?",
//           answer: "Si elegiste envío a domicilio, tu pedido puede recibirlo cualquier persona mayor de 18 años, que se encuentre en el domicilio acordado, presentando documento de identidad.",
//         },
//       ],
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const toggleSection = (index) => {
//     setActiveSection(activeSection === index ? null : index);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h1>
//       <div className="bg-white shadow-md rounded-lg">
//         {sections.map((section, sectionIndex) => (
//           <div key={sectionIndex}>
//             <div
//               className="p-4 cursor-pointer bg-gray-100 border-b"
//               onClick={() => toggleSection(sectionIndex)}
//             >
//               <h2 className="text-lg font-semibold">{section.title}</h2>
//             </div>
//             {activeSection === sectionIndex && section.faqs.map((faq, index) => (
//               <div key={index}>
//                 <div
//                   className="flex justify-between items-center p-4 cursor-pointer border-b"
//                   onClick={() => toggleFAQ(index)}
//                 >
//                   <h3 className="text-md font-medium">{faq.question}</h3>
//                   <span className="text-xl">{activeIndex === index ? '-' : '+'}</span>
//                 </div>
//                 {activeIndex === index && (
//                   <div className="p-4 text-gray-700">
//                     <p>{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Faq;

'use client';
import React, { useState } from 'react';

function Faq() {
  const [activeSections, setActiveSections] = useState({});

  const sections = [
    {
      title: "Pagos",
      faqs: [
        {
          question: "¿Cuáles son los medios de pago disponibles?",
          answer: "Podrás abonar tus pedidos con Tarjeta de Crédito/debito o por Mercado Pago a través de Cupones de Pago.",
        },
        {
          question: "¿Es seguro pagar con mi tarjeta de crédito en IndumentaryBrix?",
          answer: "Sí, es seguro. Entendemos que la seguridad de tu información personal es de suma importancia para vos. Cumplimos con el estándar internacional de protección de datos, para que tu información personal y de tarjeta de crédito, esté protegida de accesos no autorizados.",
        },
        {
          question: "¿Cómo sé que mi pago fue acreditado?",
          answer: "Una vez que tu pago haya sido acreditado correctamente por administración, recibirás un correo electrónico informándote el número de acreditación y el número de factura correspondiente.",
        },
      ],
    },
    {
      title: "Envío y Retiro",
      faqs: [
        {
          question: "¿Cuáles son las formas de envío?",
          answer: "Envíos a domicilio: Envíos a cualquier punto del país",
        },
        {
          question: "¿Cuál es el costo del envío?",
          answer: (
            <div>
              <p>El costo de envío puede variar según la ubicación y el método de envío elegido. A continuación, se detallan los precios por región:</p>
              <ul className="list-disc pl-5">
                <li>La Rioja $2.000*</li>
                <li> PBA desde $5.499*</li>
                <li> CENTRO desde $5.499*</li>
                <li> CUYO desde $5.499*</li>
                <li> NOA desde $6.499*</li>
                <li> NEA desde $6.499*</li>
                <li>PATAGONIA desde $6.999*</li>
                <li>CABA desde $5.999*</li>
                <li>CÓRDOBA CAPITAL desde $6.999*</li>
                <li>ROSARIO desde $6.999*</li>
                <li>MENDOZA CIUDAD desde $6.999*</li>
                <li>PARANÁ desde $6.999*</li>
                <li>SANTA FE desde $6.999*</li>
                <li>SAN JUAN desde $6.999*</li>
                <li>SAN LUIS desde $6.999*</li>
                <li>BAHÍA BLANCA desde $6.999*</li>  
              </ul>
            </div>
          ),
        },
        {
          question: "¿Cuánto tarda en llegar mi pedido?",
          answer: "El tiempo de entrega depende de la disponibilidad del producto, del tiempo de envío y de la aprobación del medio de pago. Los días que se indiquen son estimativos, y corren siempre a partir del momento en que el pago es aprobado. Los envíos se realizan en toda la República Argentina",
        },
        {
          question: "¿En qué días y horarios entregan los pedidos?",
          answer: "Las entregas a domicilio se realizan de lunes a viernes de 8 hs a 00 hs. No se entregan pedidos fines de semana ni feriados.",
        },
        {
          question: "¿Puede recibir mi pedido otra persona?",
          answer: "Si elegiste envío a domicilio, tu pedido puede recibirlo cualquier persona mayor de 18 años, que se encuentre en el domicilio acordado, presentando documento de identidad.",
        },
      ],
    },
  ];

  const toggleFAQ = (sectionIndex, faqIndex) => {
    setActiveSections((prev) => ({
      ...prev,
      [sectionIndex]: prev[sectionIndex] === faqIndex ? null : faqIndex,
    }));
  };

  const toggleSection = (index) => {
    setActiveSections((prev) => ({
      ...prev,
      [index]: prev[index] === null ? null : prev[index] === undefined ? null : null,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6 dark:text-[#B4B4B4]">Preguntas Frecuentes</h1>
      <div className="bg-white shadow-md rounded-lg dark:bg-[#19191A] dark:text-[#B4B4B4]">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div
              className="p-4 cursor-pointer bg-gray-100 dark:bg-gray-400 border-b text-black"
              onClick={() => toggleSection(sectionIndex)}
            >
              <h2 className="text-lg font-semibold ">{section.title}</h2>
            </div>
            {section.faqs.map((faq, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center p-4 cursor-pointer border-b"
                  onClick={() => toggleFAQ(sectionIndex, index)}
                >
                  <h3 className="text-md font-medium">{faq.question}</h3>
                  <span className="text-xl">{activeSections[sectionIndex] === index ? '-' : '+'}</span>
                </div>
                {activeSections[sectionIndex] === index && (
                  <div className="p-4 text-gray-700 dark:text-[#B4B4B4]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
