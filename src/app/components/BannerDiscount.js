import Link from 'next/link';
import { Button, Box, Typography } from '@mui/material';

function BannerDiscount() {
  return (
    <Box  sx={{ padding: '92px' ,textAlign:'center'}}>
      <Typography variant="h4" component="h2" className="uppercase font-black text-primary p-">
        Consigue hasta un -25%
      </Typography>
      <Typography variant="h6" component="h3" className="mt-3 font-semibold">
        -20% al gastar 100€. Usa el codigo BRIX
      </Typography>
      <Box maxWidth="md" mx="auto" display="flex" justifyContent="center" gap={2} marginTop={5}>
        <Button
          component={Link}
          href=""
          variant="contained"
          color="primary"
          className="font-bold"
        >
          Comprar
        </Button>
        <Button
          component={Link}
          href="#"
          variant="outlined"
          color="primary"
          className="font-bold"
        >
          Más información
        </Button>
      </Box>
    </Box>
  );
}

export default BannerDiscount;
