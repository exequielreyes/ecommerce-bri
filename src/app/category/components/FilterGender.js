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

    return (
        <div className="my-5 w-60">
            <div className="flex items-center justify-between cursor-pointer" onClick={handleToggle}>
                <FormLabel component="legend" className="mb-3 font-bold">Género</FormLabel>
                <IconButton onClick={handleToggle} sx={{ color: 'black' }}>
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            <Divider className="my-2" />
            <Collapse in={open}>
                <Box
                    sx={{
                        borderRadius: 1,
                        padding: 2,
                        marginTop: 1,
                        maxHeight: 200,
                        overflowY: 'auto'
                    }}
                >
                    {genders.map(gender => (
                        <FormControlLabel
                            key={gender}
                            control={<Checkbox onChange={handleChange} value={gender} checked={selectedGender.includes(gender)} />}
                            label={gender}
                            sx={{ display: 'block', marginBottom: 1 }}
                        />
                    ))}
                </Box>
            </Collapse>
        </div>
    );
}

export default FilterGender;
