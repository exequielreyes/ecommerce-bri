import { FaQuestionCircle } from "react-icons/fa";
import { formatPrice } from "../../../../../lib/formatPrice";

const CartSummary = ({ total, postalCode, onPostalCodeChange, onPostalCodeSubmit, onCheckout, discount,shippingCost  }) => {
  const validTotal = typeof total === "number" ? total : 0;
  const validDiscount = typeof discount === "number" ? discount : 0;

  const discountAmount = validTotal * (validDiscount / 100);
  const finalPrice = validTotal - discountAmount + shippingCost;


  //si es mayor de 80000 envio gratis
  const isFreeShipping = validTotal >= 80000;
  
  return(
    <div className="md:w-1/3">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h4 className="text-xl font-semibold mb-4">RESUMEN DE COMPRA</h4>
        <div className="flex items-center justify-between relative">
          <p className="text-gray-600 mr-2">Subtotal</p>
          <div className="group relative flex items-center">
            <FaQuestionCircle size={16} className="text-white-500 cursor-pointer hover:text-gray-600" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex w-64 bg-gray-800 text-white text-xs rounded p-2 shadow-lg z-10">
              El subtotal refleja el importe total de su pedido, no incluye los gastos del envío.
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-800 ml-auto">{formatPrice(validTotal)}</span>
        </div>

        
        
        <div className="flex items-center space-x-3 mt-4">
          <div className="flex-grow">
            <label htmlFor="postalCode" className="text-gray-600 mb-1 block">Calculá el costo de envío</label>
            <div className="flex items-center">
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={onPostalCodeChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Ingresa tu código postal"
                disabled={isFreeShipping}
              />
              <button
                onClick={onPostalCodeSubmit}
                className={`bg-purple-500 text-white px-4 py-2 ml-2 rounded hover:bg-purple-600 transition-colors duration-300 ${isFreeShipping ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isFreeShipping}
             >
                Calcular
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 mr-2">Costo de envío</p>
          <span className="text-lg font-semibold text-gray-800 ml-auto">{formatPrice(isFreeShipping ? 0 : shippingCost)}</span>
        </div>
        <p className="text-lg font-semibold text-gray-800">
          Total: <span className="font-bold ml-auto text-right">{formatPrice(finalPrice)}</span>
        </p>
        <button 
          className="bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 transition-colors duration-300"
          onClick={onCheckout}
        >
          Continuar compra
        </button>
      </div>
    </div>
  
  );
  
}


  export default CartSummary;
  