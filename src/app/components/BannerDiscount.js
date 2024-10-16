import Link from 'next/link';
function BannerDiscount() {
  return (
    <div  className='py-24 text-center'>
      <span className= 'text-3xl block uppercase font-black text-primary'>
        Consigue hasta un -25%
      </span>
      <span className= 'mt-3 text-lg font-semibold'>
       Envio gratis desde $80.000
      </span>
      <div  className="max-w-md mx-auto flex justify-center gap-4 mt-5">
      <Link href="/category/search-results"  className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"  passHref>
          
            Comprar
        </Link>
        <Link href="/about" passHref className="px-6 py-2 border border-primary text-primary  rounded hover:bg-primary-light hover:text-gray-600 transition">
          Más información
        </Link>
      </div>
    </div>
  );
}

export default BannerDiscount;

