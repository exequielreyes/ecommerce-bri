'use client'
import { Button } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


function PageSuccess() {
    const router = useRouter()
  return (
    <div className='max-w-5xl p-4 mx-auto sm:py-16 sm:px-24'>
        <div className=' flex flex-col-reverse gap-2 sm:flex-row'>
            <div className='flex justify-center md:min-w-[400px]'>
                <Image  src="/success.jpeg" alt='Success' width={350} height={500} className='rounded-lg'/>
            </div>
            <div>
                <h1 className='text-3xl'>¡Gracias por tu compra!</h1>
                <p className='my-3'>Estamos emocionados de que hayas elegido nuestras prendas. Tu pedido está en camino.</p>
                <p className='my-3'>¡No podemos esperar a que lo recibas y lo disfrutes!</p>
                
                <Button onClick={() => router.push("/")}>Volver a la tienda</Button>

            </div>

        </div>
        
    </div>
  )
}

export default PageSuccess