'use client'

import { ChevronUp } from "lucide-react";

function ScrollButton() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  return (
    <div className="fixed bottom-[120px] right-8 z-20">
    <button 
      onClick={scrollToTop} 
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full py-3 px-3 flex items-center justify-center"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  </div>
  )
}

export default ScrollButton