const ProgressSteps = ({ currentStep }) => {
  const getStepClass = (step) => (
    step === currentStep ? "bg-purple-500 text-white" : "bg-gray-300 text-white"
  );

  return (
    // <div className="flex justify-center space-x-6 mt-6 mb-4">
    //   {[1, 2, 3].map(step => (
    //     <div key={step} className="flex flex-col items-center">
    //       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStepClass(step)}`}>
    //         {step}
    //       </div>
    //       <span className="mt-2 text-sm font-medium text-gray-700">{step === 1 ? 'Carrito' : step === 2 ? 'Envío' : 'Pago'}</span>
    //     </div>
    //   ))}
    // </div>
    <div className="flex flex-col items-center">
    <div className="max-w-xl w-full p-4">
      <h2 className="sr-only">Steps</h2>
      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          <li className="flex items-center gap-2 bg-white p-2">
            <span className="size-6 rounded-full bg-blue-600 text-white text-center text-[10px]/6 font-bold"> 1 </span>
            <span className="hidden sm:block"> Carrito </span>
          </li>
          <li className="flex items-center gap-2 bg-white p-2">
            <span className="size-6 rounded-full  bg-gray-100  text-center text-[10px]/6 font-bold"> 2 </span>
            <span className="hidden sm:block"> Pago </span>
          </li>
        </ol>
      </div>
      
    </div>
  </div>
  );
};


export default ProgressSteps;