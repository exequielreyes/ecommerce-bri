import { FormControlLabel, Checkbox, FormLabel, IconButton, Collapse, Box, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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


  return ( 
    <div className="my-5 w-60">
    <div className="flex items-center justify-between cursor-pointer"  onClick={handleToggle}>
      <FormLabel component="legend" className="mb-3 font-bold">Color</FormLabel>
     
      <IconButton onClick={handleToggle}
      sx={{ color: 'black' }}
      >
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </div>
    <Divider className="my-2" /> {/* Divider below the color filter */}
    <Collapse in={open}>
      <Box 
        sx={{ 
          
          borderRadius: 1, 
          padding: 2,
          marginTop: 1,
          maxHeight: 200, // Adjust the height as needed
          overflowY: 'auto' // Allows vertical scrolling
        }}
      >
        {colors.map(color => (
          <FormControlLabel
            key={color}
            control={<Checkbox onChange={handleChange} value={color} checked={selectedColors.includes(color)} />}
            label={color}
            sx={{ display: 'block', marginBottom: 1 }} // Ensures checkboxes are displayed one below the other
          />
        ))}
      </Box>
    </Collapse>
   
  </div>
  );
}

export default FilterColor;
