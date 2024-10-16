import { Checkbox, Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

function FilterColor({ selectedColors, setSelectedColors }) {
    const [open, setOpen] = useState(false);
  const colors = ['Negro', 'Rojo', 'Verde', 'Azul' , 'Blanco' , 'Gris'];
  
  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedColors(prevSelectedColors => 
      checked ? [...prevSelectedColors, value] : prevSelectedColors.filter(color => color !== value)
    );
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleReset = () => {
    setSelectedColors([]);
  };

  return ( 

<div className="space-y-2 w-72 mb-3">
      {/* Estructura de detalles y resumen */}
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary onClick={handleToggle} className="flex cursor-pointer items-center dark:bg-[#19191A]  dark:text-[#B4B4B4]  justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-base font-medium"> Color </span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <ExpandMoreIcon className="dark:text-[#B4B4B4]" sx={{ color: 'black' }} />
          </span>
        </summary>

        {/* Contenido colapsable */}
        <Collapse in={open}>
          <div className="border-t border-gray-200 bg-white dark:bg-[#19191A]">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700 dark:text-[#b4b4b481]">{selectedColors.length} Seleccionado(s)</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-gray-900 underline dark:text-[#b4b4b481]  dark:hover:text-[#B4B4B4]  underline-offset-4"
              >
                Limpiar
              </button>
            </header>
            {/* aca deberia ir el overflow*/}
            <ul className="space-y-1 border-t border-gray-200 p-4 overflow-auto max-h-52">
                {colors.map(color =>(
                  <li key={color}>
                      <label htmlFor={color} className="inline-flex items-center gap-2">
                      <Checkbox 
                        id={color}
                        onChange={handleChange} 
                        value={color} 
                        checked={selectedColors.includes(color)} 
                        className="rounded border-gray-300 dark:text-[#B4B4B4]"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-[#B4B4B4] ">{color}</span>

                      </label>
                  </li>
                  
                ))}
            </ul>
          </div>
        </Collapse>
      </details>
    </div>
  );
}

export default FilterColor;
