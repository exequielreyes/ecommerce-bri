const { FaMinus, FaPlus } = require("react-icons/fa");

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
    <div className="ml-auto mr-9 flex flex-col items-center space-x-2">
        <p className="text-sm font-semibold text-gray-700">Quiero:</p>
        <div className="flex items-center space-x-2 border p-2 rounded-full">
      <button className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors" onClick={onDecrease}>
        <FaMinus size={10} />
      </button>
      <span className="text-sm font-semibold text-gray-700">{quantity}</span>
      <button className="w-6 h-6 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors" onClick={onIncrease}>
        <FaPlus size={10} />
      </button>
      </div>
    </div>
  );



  export default QuantitySelector;