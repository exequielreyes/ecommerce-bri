'use client';

import { Lock as LockIcon, Shield as ShieldIcon } from '@mui/icons-material';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 leading-tight">
          Política de Privacidad de <span className="text-blue-600">Indumentaria Brix</span>
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          En <span className="font-semibold text-blue-600">Indumentaria Brix</span>, la protección de tu privacidad es fundamental para nosotros. A continuación, te explicamos cómo recopilamos, utilizamos y protegemos tus datos personales para brindarte una experiencia segura y confiable.
        </p>

        {/* Sección 1 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LockIcon className="h-8 w-8 text-blue-600" /> 
            <span>1. Información que recopilamos</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Recopilamos información personal que nos proporcionas al interactuar con nuestros servicios, como hacer compras, registrarte en nuestra web o suscribirte a nuestras actualizaciones. Esta información incluye:
          </p>
          <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Dirección de envío</li>
            <li>Información de pago (procesada de manera segura por terceros)</li>
          </ul>
        </div>

        {/* Sección 2 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <ShieldIcon className="h-8 w-8 text-blue-600" /> 
            <span>2. Uso de la información</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Utilizamos tu información para brindarte una experiencia de compra personalizada y eficiente. Con tu permiso, también podemos enviarte actualizaciones y promociones. El uso de tu información incluye:
          </p>
          <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
            <li>Procesar y enviar tus pedidos.</li>
            <li>Ofrecerte atención al cliente y soporte postventa.</li>
            <li>Enviarte noticias y ofertas de productos que puedan interesarte.</li>
          </ul>
        </div>

        {/* Sección 3 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LockIcon className="h-8 w-8 text-blue-600" /> 
            <span>3. Protección de tus datos</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Implementamos medidas de seguridad avanzadas para proteger tus datos personales. Utilizamos protocolos de cifrado de última tecnología y mantenemos nuestras plataformas actualizadas para garantizar la seguridad de la información que compartes con nosotros.
          </p>
        </div>

        {/* Sección 4 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <ShieldIcon className="h-8 w-8 text-blue-600" /> 
            <span>4. Compartir información con terceros</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Solo compartimos tu información con terceros proveedores de servicios que nos ayudan a ofrecerte una mejor experiencia, como servicios de procesamiento de pagos y empresas de mensajería. Estos proveedores están obligados a seguir estrictos acuerdos de privacidad para proteger tus datos.
          </p>
        </div>

        {/* Sección 5 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LockIcon className="h-8 w-8 text-blue-600" /> 
            <span>5. Tus derechos</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Tienes derecho a acceder, modificar y eliminar tus datos personales en cualquier momento. Si deseas ejercer alguno de estos derechos, no dudes en contactarnos a través de nuestro correo electrónico: <span className="font-semibold text-blue-600">contacto@brixindumentaria.com</span>.
          </p>
        </div>

        {/* Sección 6 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <ShieldIcon className="h-8 w-8 text-blue-600" /> 
            <span>6. Cambios en esta política</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te recomendamos revisarla periódicamente. Cualquier cambio será notificado a través de nuestro sitio web.
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-blue-600">Última actualización:</span> Octubre 2024
          </p>
        </div>
      </div>
    </div>
  );
}
