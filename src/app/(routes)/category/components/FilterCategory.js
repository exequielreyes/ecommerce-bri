import {Checkbox, Collapse} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from "react";

function FilterCategory({ selectedCategories = [], setSelectedCategories }) {
    const [open, setOpen] = useState(false);
    const categories = ['Buzos', 'Camperas', 'Pantalones', 'Remeras', 'Shorts'];

    const handleChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories(prevSelectedCategories =>
            checked ? [...prevSelectedCategories, value] : prevSelectedCategories.filter(category => category !== value)
        );
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleReset = () => {
        setSelectedCategories([]);
    };

    return (
<div className="space-y-2 w-72 mb-3">
            {/* Diseño tipo details y summary */}
            <details className="overflow-hidden rounded border border-gray-300 dark:border-white [&_summary::-webkit-details-marker]:hidden">
                <summary onClick={handleToggle} className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 dark:bg-[#19191A]  dark:text-[#B4B4B4]  transition">
                    <span className="text-base font-medium"> Categoría </span>
                    <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                        <ExpandMoreIcon className="dark:text-[#B4B4B4]" sx={{ color: 'black' }} />
                    </span>
                </summary>

                {/* Contenido colapsable usando Collapse de Material UI */}
                <Collapse in={open}>
                    <div className="border-t border-gray-200 bg-white dark:bg-[#19191A]">
                        {/* Encabezado con cantidad seleccionada y botón de reset */}
                        <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700 dark:text-[#b4b4b481] ">{selectedCategories.length} Seleccionado(s)</span>
                            <button 
                                type="button" 
                                onClick={handleReset} 
                                className="text-sm text-gray-900 dark:text-[#b4b4b481]  dark:hover:text-[#B4B4B4] underline underline-offset-4"
                            >
                                Limpiar
                            </button>
                        </header>

                        <ul className="space-y-1 border-t border-gray-200 p-4 overflow-auto max-h-52">
                            {categories.map(category => (
                                <li key={category}>
                                    <label htmlFor={category} className="inline-flex items-center gap-2">
                                        <Checkbox
                                            id={category}
                                            value={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={handleChange}
                                            className="rounded border-gray-300 dark:text-[#B4B4B4]"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-[#B4B4B4]">{category}</span>
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

export default FilterCategory;