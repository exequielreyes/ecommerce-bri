import Link from 'next/link';
import { Box, Container, Typography, List, ListItem, Divider } from '@mui/material';

const dataFooter = [
  { id: 1, name: "Sobre nosotros", link: "#" },
  { id: 2, name: "Productos", link: "#" },
  { id: 3, name: "Mi cuenta", link: "#" },
  { id: 4, name: "Políticas de privacidad", link: "#" },
];

function Footer() {
  return (
    <Box component="footer" mt={4}  >
      <Container maxWidth="xl" sx={{ p: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="p">
          Indumentary<strong>Brix</strong> 
          </Typography>

          {/* Lista para los enlaces del footer */}
          <List sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0 }}>
            {dataFooter.map((data) => (
              <ListItem key={data.id} sx={{ p: 0, mx: 2, width: 'auto'}}>
                <Link href={data.link} passHref>
                  <Typography
                    component="span"  // Evitamos que Typography cree un <a> innecesario
                    variant="body2"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } , color:'gray' }}
                  >
                    {data.name}
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 6, width: '50%', mx: 'auto', borderColor: 'gray.300' }} />


        <Typography variant="body2" color="textSecondary" align="center">
          &copy; 2024{' '}
          <Link href="#" passHref>
            <Typography
              component="span"  // Cambiamos el componente para evitar el anidamiento de <a>
              variant="body2"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              IndumentaryBrix
            </Typography>
          </Link>
          . Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
