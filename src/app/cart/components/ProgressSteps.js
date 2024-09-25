const ProgressSteps = ({ currentStep }) => {
    const getStepClass = (step) => (
      step === currentStep ? "bg-purple-500 text-white" : "bg-gray-300 text-white"
    );
  
    return (
      <div className="flex justify-center space-x-6 mt-6 mb-4">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStepClass(step)}`}>
              {step}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">{step === 1 ? 'Carrito' : step === 2 ? 'Envío' : 'Pago'}</span>
          </div>
        ))}
      </div>
    );
  };


  export default ProgressSteps;