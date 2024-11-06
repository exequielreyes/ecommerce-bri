'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


const dataFooter = [
  { id: 1, name: "Sobre nosotros", link: "/about" },
  { id: 2, name: "Contacto", link: "/contact" },
  { id: 3, name: "Mi cuenta", link: "/user-profile" },
  { id: 4, name: "Políticas de privacidad", link: "/privacy" },
  { id: 5, name: "Faq", link: "/Faq" },

];



function Footer() {
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage = pathname.includes('sign-in') || pathname.includes('sign-up');
    setIsLogin(isAuthPage);
  }, [pathname]);

  return (
    !isLogin && (
      <footer className="mt-4 bg-slate-100 dark:bg-[#19191A]">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={` text-[#818181] dark:text-gray-500 text-lg`}>
              Indumentary<strong>Brix</strong>
            </p>

            <ul className="flex flex-col sm:flex-row items-center p-0 m-0 mt-4 sm:mt-0">
              {dataFooter.map((data) => (
                <li key={data.id} className="mx-0 sm:mx-2 my-2 sm:my-0">
                  <Link href={data.link} className={` text-[#818181] hover:text-black dark:text-gray-500 dark:hover:text-white text-sm no-underline`}>
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-6 w-1/2 mx-auto dark:border-gray-700  border-gray-300 " />

          <p className={` text-center text-[#818181] dark:text-gray-500 text-sm`}>
            &copy; 2024{' '}
            <Link href="#" className="text-[#818181] hover:text-black dark:hover:text-white no-underline">
              IndumentaryBrix
            </Link>
            . Todos los derechos reservados.
          </p>
        </div>
      </footer>
    )
  );
}

export default Footer;



