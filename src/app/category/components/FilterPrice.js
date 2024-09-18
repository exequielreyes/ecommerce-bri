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
    <div className="my-5 w-60">
      <div className="flex items-center justify-between cursor-pointer" onClick={handleToggle}>
        <FormLabel component="legend" className="mb-3 font-bold">Precio</FormLabel>
        <IconButton onClick={handleToggle}
        sx={{ color: 'black' }}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      <Divider className="my-2" />
      <Collapse in={open}>
        <Box 
          sx={{ 
            
            borderRadius: 1, 
            padding: 2,
            marginTop: 1 
          }}
        >
          <RadioGroup onChange={(event) => setFilterPrice(event.target.value)}>
            <FormControlLabel 
              value="asc" 
              control={<Radio />} 
              label="De menor a mayor" 
              sx={{ display: 'block', marginBottom: 1 }}
            />
            <FormControlLabel 
              value="desc" 
              control={<Radio />} 
              label="De mayor a menor" 
              sx={{ display: 'block', marginBottom: 1 }}
            />
          </RadioGroup>
        </Box>
      </Collapse>
      
    </div>
  );
}

export default FilterPrice;
