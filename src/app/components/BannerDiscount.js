import Link from 'next/link';
function BannerDiscount() {
  return (
    <div  className='py-24 text-center dark:text-[#B4B4B4]'>
      <span className= 'md:text-3xl text-2xl block uppercase font-black text-primary dark:text-[#B4B4B4]'>
        Consigue hasta un -25%
      </span>
      <span className= 'mt-3 text-lg font-semibold'>
       Envio gratis desde $80.000
      </span>
      <div  className="max-w-md mx-auto flex flex-col md:flex-row justify-center gap-4 mt-5 ">
      <Link href="/category/search-results"  className="px-6 py-2 w-[250px] m-auto   bg-primary dark:bg-[#19191A] dark:text-[#B4B4B4] dark:hover:text-white dark:hover:bg-black text-white rounded hover:bg-primary-dark transition"  passHref>
          
            Comprar
        </Link>
        <Link href="/about" passHref className="px-6 py-2 w-[250px] m-auto  border border-primary text-primary  dark:text-[#B4B4B4] dark:hover:text-white rounded hover:bg-primary-light hover:text-gray-600 transition">
          Más información
        </Link>
      </div>
    </div>
  );
}

export default BannerDiscount;

