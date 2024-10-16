import { FormControlLabel, Checkbox, FormLabel, IconButton, Collapse, Box, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";

function FilterGender({ selectedGender, setSelectedGender }) {
    const [open, setOpen] = useState(false);
    const genders = ['Hombre', 'Mujer']; // Estos valores deben coincidir con los valores de taste en tu base de datos

    const handleChange = (event) => {
        const { value, checked } = event.target;
        setSelectedGender(prevSelectedGender =>
            checked ? [...prevSelectedGender, value] : prevSelectedGender.filter(gender => gender !== value)
        );
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleReset = () => {
        setSelectedGender([]);
    };

    return (
        <div className="space-y-2 w-72 mb-3">
        {/* Diseño tipo details y summary */}
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary  onClick={handleToggle}  className="flex cursor-pointer dark:bg-[#19191A]  dark:text-[#B4B4B4]  items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                <span className="text-base font-medium"> Género </span>
                <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                        <ExpandMoreIcon className="dark:text-[#B4B4B4]" sx={{ color: 'black' }} />
                    </span>
            </summary>

            {/* Contenido colapsable usando Collapse de Material UI */}
            <Collapse in={open}>
                <div className="border-t border-gray-200 bg-white">
                    {/* Encabezado con cantidad seleccionada y botón de reset */}
                    <header className="flex items-center justify-between p-4 dark:bg-[#19191A]">
                        <span className="text-sm text-gray-700 dark:text-[#b4b4b481]">{selectedGender.length} Seleccionado(s)</span>
                        <button 
                            type="button" 
                            onClick={handleReset} 
                            className="text-sm text-gray-900 dark:text-[#b4b4b481] dark:hover:text-[#B4B4B4] underline underline-offset-4"
                        >
                            Limpiar
                        </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4 dark:bg-[#19191A]">
                        {genders.map(gender => (
                            <li key={gender}>
                                <label htmlFor={gender} className="inline-flex items-center gap-2">
                                    <Checkbox
                                        id={gender}
                                        value={gender}
                                        checked={selectedGender.includes(gender)}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 dark:text-[#B4B4B4]"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-[#B4B4B4]">{gender}</span>
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

export default FilterGender;
