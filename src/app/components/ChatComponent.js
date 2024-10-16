
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ChatComponent = ({ steps }) => {
    const { seleccion, seleccionProduct, seleccionTalles } = steps;
    const [busqueda, setBusqueda] = useState("");
    const [nombreCurado, setNombreCurado] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (seleccion) {
            if (seleccion.value === "b") {
                setBusqueda(seleccionProduct.value); // Asegúrate de que seleccionProduct también esté definido
                setNombreCurado(seleccionProduct.value.includes("_")
                    ? seleccionProduct.value.substring(0, seleccionProduct.value.indexOf("_"))
                    : seleccionProduct.value
                );
            } else if (seleccion.value === "t") {
                setBusqueda(seleccionTalles.value); // Asegúrate de que seleccionTalles también esté definido
                setNombreCurado(seleccionTalles.value.includes("_")
                    ? seleccionTalles.value.substring(0, seleccionTalles.value.indexOf("_"))
                    : seleccionTalles.value
                );
            }
        }
    }, [seleccion, seleccionProduct, seleccionTalles]);

    const handleClick = () => {
        router.push(`${process.env.NEXT_PUBLIC_URL}/category/${busqueda}`);
    };


    return (
        <div>
            <p>Explora los productos disponibles en siguiente link </p>
            <strong onClick={handleClick} className="cursor-pointer underline hover:text-black text-base">
                {nombreCurado}
            </strong>
        </div>
    );
};

export default ChatComponent;