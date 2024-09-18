import { useGetProductField } from "@/app/api/getProductField";
import { Radio, FormControlLabel, RadioGroup, FormLabel, IconButton, Collapse, Checkbox, Box, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";

function FilterOrigin({ filterOrigin, setFilterOrigin }) {
  const [open, setOpen] = useState(false);
  const { result, loading } = useGetProductField();


  const handleChange = (event) => {
    const { value, checked } = event.target;
    setFilterOrigin(prevFilterOrigin => 
      checked ? [...prevFilterOrigin, value] : prevFilterOrigin.filter(origin => origin !== value)
    );
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (

<div className="my-5 w-60">
      <div className="flex items-center justify-between cursor-pointer" onClick={handleToggle}>
        <FormLabel component="legend" className="mb-3 font-bold">Marcas</FormLabel>
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
            maxHeight: 200, // Adjust the height as needed
            overflowY: 'auto' // Allows vertical scrolling
             
          }}
        >
        {loading && result === null && <p>Cargando origen..</p>}
        {result !== null &&
          result.schema.attributes.origin.enum.map((origin) => (
            <FormControlLabel
              key={origin}
              control={<Checkbox onChange={handleChange} value={origin} checked={filterOrigin.includes(origin)} />}
              label={origin}
              sx={{ display: 'block', marginBottom: 1 }}
            />
          ))}
      </Box>
      </Collapse>
      
    </div>



    //descomentar esto por si causa problema
    // <div className="my-5">
    //   <FormLabel component="legend" className="mb-3 font-bold">Hombre</FormLabel>
    //   {loading && result === null && <p>Cargando origen..</p>}

    //   <RadioGroup onChange={(event) => setFilterOrigin(event.target.value)}>
    //     {result !== null &&
    //       result.schema.attributes.origin.enum.map((origin) => (
    //         <FormControlLabel
    //           key={origin}
    //           value={origin}
    //           control={<Radio />}
    //           label={origin}
    //         />
    //       ))}
    //   </RadioGroup>
    // </div>
  );
}

export default FilterOrigin;
