

import { useGetProductField } from "@/app/api/getProductField";
import { FormControlLabel, Checkbox, Box, IconButton, Collapse, Divider, FormLabel } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState, useEffect } from "react";

function FilterOrigin({ filterOrigin = [], setFilterOrigin }) {
  const [open, setOpen] = useState(false);
  const { result, loading } = useGetProductField();
  const [uniqueBrands, setUniqueBrands] = useState([]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setFilterOrigin(prevFilterOrigin =>
      checked ? [...prevFilterOrigin, value] : prevFilterOrigin.filter(brand => brand !== value)
    );
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleReset = () => {
    setFilterOrigin([]);
  };

 // Usa useEffect para ver los datos cuando se reciban
 useEffect(() => {
  if (result) {
    // Obtener marcas únicas
    const brandsSet = new Set();
    result.forEach(product => {
      if (product.attributes.brand && product.attributes.brand.data) {
        brandsSet.add(product.attributes.brand.data.attributes.name);
      }
    });
    setUniqueBrands([...brandsSet]); 
  }
}, [result]); 

  return (
    <div className="space-y-2 w-72 mb-3">
     
      <details className="overflow-hidden rounded border border-gray-300 dark:border-white [&_summary::-webkit-details-marker]:hidden">
        <summary onClick={handleToggle} className="flex cursor-pointer dark:bg-[#19191A]  dark:text-[#B4B4B4]  items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-base font-medium"> Marcas </span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <ExpandMoreIcon className="dark:text-[#B4B4B4]" sx={{ color: 'black' }} />
          </span>
        </summary>

        {/* Contenido colapsable usando Collapse de Material UI */}
        <Collapse in={open}>
          <div className="border-t border-gray-200  bg-white dark:bg-[#19191A]  ">
            <header className="flex items-center justify-between p-4 ">
              <span className="text-sm text-gray-700  dark:text-[#b4b4b481]">{filterOrigin.length} Seleccionada(s)</span>
              <button 
                type="button" 
                onClick={handleReset} 
                className="text-sm text-gray-900 dark:text-[#b4b4b481] dark:hover:text-[#B4B4B4]underline underline-offset-4"
              >
                Limpiar
              </button>
            </header>

            {loading && result === null && <p>Cargando marcas...</p>}
            {uniqueBrands.length > 0 ? (
              <ul className="space-y-1 border-t border-gray-200 p-4 overflow-auto max-h-52">
                {uniqueBrands.map((brand) => (
                  <li key={brand}>
                    <label htmlFor={brand} className="inline-flex items-center gap-2">
                      <Checkbox
                        id={brand}
                        value={brand}
                        checked={filterOrigin.includes(brand)}
                        onChange={handleChange}
                        className="rounded border-gray-300 dark:text-[#B4B4B4]"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-[#B4B4B4]">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p className="p-4">No se encontraron marcas.</p>
            )}
          </div>
        </Collapse>
      </details>

     
    </div>
  );
}

export default FilterOrigin;