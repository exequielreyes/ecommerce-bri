'use client'
import Link from 'next/link';
import { Box, Container, Typography, List, ListItem, Divider } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";

const dataFooter = [
  { id: 1, name: "Sobre nosotros", link: "/about" },
  { id: 2, name: "Contacto", link: "/contact" },
  { id: 3, name: "Mi cuenta", link: "#" },
  { id: 4, name: "Políticas de privacidad", link: "#" },
];

const inter = Inter({subsets:['latin']})

function Footer() {

  const [ isLogin, setIsLogin ] = useState(false);

    const pathname = usePathname(); // Obtenemos la ruta actual

  useEffect(() => {
    // Actualizamos el estado basado en la ruta actual
    const isAuthPage = pathname.includes('sign-in') || pathname.includes('sign-up');
    setIsLogin(isAuthPage);
    
  }, [pathname]); // Cada vez que la ruta cambie, ejecutamos este efecto
  return (
    !isLogin &&(
    <Box component="footer" mt={4}  className='bg-slate-100 dark:bg-[#19191A]'>
      <Container maxWidth="xl" sx={{ p: 4 }}  >
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="p" className={`${inter.className} text-[#818181] dark:text-gray-500`}>
          Indumentary<strong>Brix</strong> 
          </Typography>

          {/* Lista para los enlaces del footer */}
          <List sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0 }}>
            {dataFooter.map((data) => (
              <ListItem key={data.id} sx={{ p: 0, mx: 2, width: 'auto'}}>
                <Link href={data.link} passHref>
                  <Typography
                  className={`${inter.className} text-[#818181] hover:text-black dark:text-gray-500 dark:hover:text-white`}
                    component="span"  // Evitamos que Typography cree un <a> innecesario
                    variant="body2"
                    sx={{ textDecoration: 'none'}}
                  >
                    {data.name}
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 6, width: '50%', mx: 'auto', borderColor: 'gray.300' }} />


        <Typography variant="body2" color="textSecondary" align="center" className={`${inter.className} text-[#818181] dark:text-gray-500` }>
          &copy; 2024{' '}
          <Link href="#" passHref>
            <Typography
              component="span"  // Cambiamos el componente para evitar el anidamiento de <a>
              variant="body2"
              sx={{ textDecoration: 'none'}}
            >
              IndumentaryBrix
            </Typography>
          </Link>
          . Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
    )
  );
}

export default Footer;


