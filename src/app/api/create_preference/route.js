// import { NextResponse } from "next/server";
// import { MercadoPagoConfig, Preference } from "mercadopago";

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MP_ACCESS_TOKEN,
// });

// export async function POST(request) {
//   try {
//     const { title, quantity, price, images } = await request.json();
//     const body = {
//       items: [
//         {
//           title: title,
//           quantity: Number(quantity),
//           unit_price: Number(price),
//           currency_id: "ARS",
//           picture_url: images,
//         },
//       ],
//       back_urls: {
//         success: `${process.env.NEXT_PUBLIC_URL}/success`,
//         failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
//         pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
//       },
//       auto_return: "approved",
//     };

//     const preference = new Preference(client);
//     const result = await preference.create({ body });

//     return NextResponse.json({ id: result.id });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al crear la preferencia" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const { items } = await request.json(); // Asegúrate de que el JSON tiene una propiedad 'items'
    const body = {
      items: items.map(item => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "ARS",
        picture_url: item.image,
      })),
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}





