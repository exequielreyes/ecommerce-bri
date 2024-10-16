const { FaMinus, FaPlus } = require("react-icons/fa");

const QuantitySelector = ({ quantity, onIncrease, onDecrease, availableStock }) => (
    <div className="ml-auto mr-9 flex flex-col items-center space-x-2">
        <p className="text-sm font-semibold text-gray-700">Quiero:</p>
        <div className="flex items-center space-x-2 border p-2 rounded-full">
      <button 
      className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors" onClick={onDecrease}>
        <FaMinus size={10} 
        
        />
      </button>
      <span className="text-sm font-semibold text-gray-700">{quantity}</span>
      <button 
     className={`w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors ${quantity >= availableStock ? 'opacity-50 cursor-not-allowed' : ''}`}
     onClick={quantity < availableStock ? onIncrease : null}
     disabled={quantity >= availableStock}
      >
        <FaPlus size={10} />
      </button>
      </div>
      {/* Texto "Disponible:" debajo de los botones */}
    <p className="text-xs text-gray-600 mt-2">Disponible: {availableStock} unidades</p>
    </div>
  );



  export default QuantitySelector;