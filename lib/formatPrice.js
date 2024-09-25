export function formatPrice(price) {
    const priceFormated = new Intl.NumberFormat('es-AR', {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
    });
    const finalPrice = priceFormated.format(price);
    return finalPrice;
}
// export function formatPrice(price) {
//     const priceFormated = new Intl.NumberFormat('es-AR', {
//         style: "decimal", // Cambiar a "decimal"
//         minimumFractionDigits: 0,
//     });

//     const finalPrice = priceFormated.format(price);
//     return `$${finalPrice}`; // Añadir el símbolo ARS manualmente
// }
