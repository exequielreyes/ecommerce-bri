import { Box, Checkbox, Collapse, Divider, FormControlLabel, FormLabel, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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

    return (
        <div className="my-5 w-60">
            <div className="flex items-center justify-between cursor-pointer" onClick={handleToggle}>
                <FormLabel component="legend" className="mb-3 font-bold">Categoría</FormLabel>
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
                    {categories.map(category => (
                        <FormControlLabel
                            key={category}
                            control={<Checkbox onChange={handleChange} value={category} checked={Array.isArray(selectedCategories) && selectedCategories.includes(category)} />} // Validar que selectedCategories sea un array
                            label={category}
                            sx={{ display: 'block', marginBottom: 1 }}
                        />
                    ))}
                </Box>
            </Collapse>
        </div>
    );
}

export default FilterCategory;