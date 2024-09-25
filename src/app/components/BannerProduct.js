import Link from 'next/link';
import { Button, Box, Typography } from '@mui/material';

function BannerProduct() {
  return (
    <>
      <Box mt={4} textAlign="center">
        <Typography variant="body1">Sumergete en una experiencia única</Typography>
        <Typography variant="h3" component="h4" fontWeight="bold" className="uppercase mt-2">
          TodoModa
        </Typography>
        <Typography variant="h6" component="p" className="my-2">
          Despierta tu moda
        </Typography>
        <Button component={Link} href="#" variant="contained" color="primary">
          Comprar
        </Button>
      </Box>
      <Box
        mt={5}
        height={{ xs: 350, lg: 600 }}
        sx={{
          backgroundImage: "url('/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </>
  );
}

export default BannerProduct;
