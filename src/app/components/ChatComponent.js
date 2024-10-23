
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ChatComponent = ({ steps }) => {
    const { seleccion, seleccionProduct, seleccionTalles } = steps;
    const [busqueda, setBusqueda] = useState("");
    const [nombreCurado, setNombreCurado] = useState("");
    const router = useRouter();
    // const [isTallesSelected, setIsTallesSelected] = useState(false);

    useEffect(() => {
        if (seleccion) {
            if (seleccion.value === "b" && seleccionProduct?.value) {
                setBusqueda(seleccionProduct.value); // Asegúrate de que seleccionProduct también esté definido
                setNombreCurado(seleccionProduct.value.includes("_")
                    ? seleccionProduct.value.substring(0, seleccionProduct.value.indexOf("_"))
                    : seleccionProduct.value
                );
            } else if (seleccion.value === "t" && seleccionTalles?.value) {
                setBusqueda(seleccionTalles.value); // Asegúrate de que seleccionTalles también esté definido
                setNombreCurado(seleccionTalles.value.includes("_")
                    ? seleccionTalles.value.substring(0, seleccionTalles.value.indexOf("_"))
                    : seleccionTalles.value
                );
            }
        }
    }, [seleccion, seleccionProduct, seleccionTalles]);

    const handleClick = () => {
        if(busqueda){
            router.push(`${process.env.NEXT_PUBLIC_URL}/category/${busqueda}`);
        }
    };

    // const handleClick = () => {
    //     if (!isTallesSelected) {
    //         router.push(`${process.env.NEXT_PUBLIC_URL}/category/${busqueda}`);
    //     }
    // };



    return (
        <div>
            <p>Explora los productos disponibles en siguiente link </p>
            <strong onClick={handleClick} className="cursor-pointer underline hover:text-black text-base">
                {nombreCurado}
            </strong>
        </div>



        // <div>
        //     {seleccion?.value === "b" ? (
        //         // Si selecciona un producto
        //         <>
        //             <p>Explora los productos disponibles en el siguiente link</p>
        //             <strong onClick={handleClick} className="cursor-pointer underline hover:text-black text-base">
        //                 {nombreCurado}
        //             </strong>
        //         </>
        //     ) : seleccion?.value === "t" ? (
        //         // Si selecciona la opción de guía de talles
        //         <>
        //             <p>Puedes consultar nuestra guía de talles aquí:</p>
        //             <strong onClick={() => router.push('/talles')} className="cursor-pointer underline hover:text-black text-base">
        //                 Guía de talles
        //             </strong>
        //         </>
        //     ) : null}
        // </div>

    );
};

export default ChatComponent;