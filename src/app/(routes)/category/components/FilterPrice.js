import { Radio, FormControlLabel, RadioGroup, FormLabel, IconButton, Collapse, Box, Divider } from "@mui/material";
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function FilterPrice({ setFilterPrice }) {
    //para desplegar
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
      };
  return (

    <div className="space-y-2 w-72 mb-3">
    {/* Diseño tipo details y summary */}
    <details className="overflow-hidden rounded border border-gray-300  [&_summary::-webkit-details-marker]:hidden">
        <summary  onClick={handleToggle} className="flex cursor-pointer items-center justify-between gap-2 bg-white dark:bg-[#19191A]  dark:text-[#B4B4B4]  p-4 text-gray-900   transition">
          <span className="text-base font-medium"> Precio </span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <ExpandMoreIcon className="dark:text-[#B4B4B4]" sx={{ color: 'black' }} />
          </span>
        </summary>

      {/* Contenido colapsable */}
      <Collapse in={open}>
        <div className="border-t border-gray-200 bg-white dark:bg-[#19191A]  dark:text-[#B4B4B4]">
          <RadioGroup 
            onChange={(event) => setFilterPrice(event.target.value)} 
            className="dark:text-[#B4B4B4] p-4"
           
          >
            <FormControlLabel 
              value="asc" 
              control={<Radio className="dark:text-[#B4B4B4]"/>} 
              label="De menor a mayor" 
              sx={{ display: 'block', marginBottom: 1}}
              
            />
            <FormControlLabel 
              value="desc" 
              control={<Radio className="dark:text-[#B4B4B4]"/>} 
              label="De mayor a menor" 
             
            />
          </RadioGroup>
        </div>
      </Collapse>
    </details>

    
  </div>
  );
}

export default FilterPrice;
