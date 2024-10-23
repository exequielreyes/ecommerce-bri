'use client'
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Image from 'next/image'
import React from 'react'
import { useState } from 'react';

function PageTalles() {

  const [gender, setGender] = useState('hombre');
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };
  

  return (
    <Box
    
  >
    <Typography variant="h6" component="h2" sx={{textAlign:'center' , marginBottom:'10px'}}>
      Guía de Talles
    </Typography>

    <div className="mb-4 flex items-center justify-center">
        <Button
          variant={gender === 'hombre' ? 'contained' : 'outlined'}
          onClick={() => handleGenderChange('hombre')}
          sx={{marginRight:'10px'}}
        >
          Hombre
        </Button>
        <Button
          variant={gender === 'mujer' ? 'contained' : 'outlined'}
          onClick={() => handleGenderChange('mujer')}
          sx={{marginLeft:'10px'}}

        >
          Mujer
        </Button>
      </div>

    <div class=" inset-0 flex items-center justify-center  bg-opacity-50">
      <div class="bg-white p-6   max-w-7xl w-full">
      {gender === 'hombre' ? (
         <>
        <h2 class="text-2xl font-bold mb-4">
          Talles de prendas superiores para hombre
        </h2>

        <table className="table-auto w-full text-left border-collapse border border-gray-300 mb-4">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">
                Etiqueta del producto
              </th>
              <th class="border border-gray-300 px-4 py-2">XS</th>
              <th class="border border-gray-300 px-4 py-2">S</th>
              <th class="border border-gray-300 px-4 py-2">M</th>
              <th class="border border-gray-300 px-4 py-2">L</th>
              <th class="border border-gray-300 px-4 py-2">XL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Pecho</td>
              <td class="border border-gray-300 px-4 py-2">83 - 86 cm</td>
              <td class="border border-gray-300 px-4 py-2">87 - 92 cm</td>
              <td class="border border-gray-300 px-4 py-2">93 - 100 cm</td>
              <td class="border border-gray-300 px-4 py-2">101 - 108 cm</td>
              <td class="border border-gray-300 px-4 py-2">109 - 118 cm</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Cintura</td>
              <td class="border border-gray-300 px-4 py-2">71 - 74 cm</td>
              <td class="border border-gray-300 px-4 py-2">75 - 80 cm</td>
              <td class="border border-gray-300 px-4 py-2">81 - 88 cm</td>
              <td class="border border-gray-300 px-4 py-2">89 - 96 cm</td>
              <td class="border border-gray-300 px-4 py-2">97 - 106 cm</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Cadera</td>
              <td class="border border-gray-300 px-4 py-2">82 - 85 cm</td>
              <td class="border border-gray-300 px-4 py-2">86 - 91 cm</td>
              <td class="border border-gray-300 px-4 py-2">92 - 99 cm</td>
              <td class="border border-gray-300 px-4 py-2">100 - 107 cm</td>
              <td class="border border-gray-300 px-4 py-2">108 - 116 cm</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-xl font-semibold mt-6">Talle Largo</h3>
        <p>
          Los talles largos están diseñados para hombres de más de 189cm.
        </p>
        <table class="table-auto w-full text-left border-collapse border border-gray-300 mb-4">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">
                Etiqueta del producto
              </th>
              <th class="border border-gray-300 px-4 py-2">S Largo</th>
              <th class="border border-gray-300 px-4 py-2">M Largo</th>
              <th class="border border-gray-300 px-4 py-2">L Largo</th>
              <th class="border border-gray-300 px-4 py-2">XL Largo</th>
              <th class="border border-gray-300 px-4 py-2">2XL Largo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Pecho</td>
              <td class="border border-gray-300 px-4 py-2">87 - 92 cm</td>
              <td class="border border-gray-300 px-4 py-2">93 - 100 cm</td>
              <td class="border border-gray-300 px-4 py-2">101 - 108 cm</td>
              <td class="border border-gray-300 px-4 py-2">109 - 118 cm</td>
              <td class="border border-gray-300 px-4 py-2">119 - 130 cm</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Cintura</td>
              <td class="border border-gray-300 px-4 py-2">75 - 80 cm</td>
              <td class="border border-gray-300 px-4 py-2">81 - 88 cm</td>
              <td class="border border-gray-300 px-4 py-2">89 - 96 cm</td>
              <td class="border border-gray-300 px-4 py-2">97 - 106 cm</td>
              <td class="border border-gray-300 px-4 py-2">107 - 119 cm</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Cadera</td>
              <td class="border border-gray-300 px-4 py-2">86 - 91 cm</td>
              <td class="border border-gray-300 px-4 py-2">92 - 99 cm</td>
              <td class="border border-gray-300 px-4 py-2">100 - 107 cm</td>
              <td class="border border-gray-300 px-4 py-2">108 - 116 cm</td>
              <td class="border border-gray-300 px-4 py-2">117 - 125 cm</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-xl font-semibold mt-6">Talle Corto</h3>
        <p>
          Los talles petite/cortos están diseñados para hombres de hasta
          175cm.
        </p>
        <table className="table-auto w-full text-left border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Etiqueta del producto
              </th>
              <th className="border border-gray-300 px-4 py-2">XS Corto</th>
              <th className="border border-gray-300 px-4 py-2">S Corto</th>
              <th className="border border-gray-300 px-4 py-2">M Corto</th>
              <th className="border border-gray-300 px-4 py-2">L Corto</th>
              <th className="border border-gray-300 px-4 py-2">XL Corto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Pecho</td>
              <td className="border border-gray-300 px-4 py-2">83 - 86 cm</td>
              <td className="border border-gray-300 px-4 py-2">87 - 92 cm</td>
              <td className="border border-gray-300 px-4 py-2"> 93 - 100 cm</td>
              <td className="border border-gray-300 px-4 py-2">101 - 108 cm</td>
              <td className="border border-gray-300 px-4 py-2"> 109 - 118 cm
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cintura</td>
              <td className="border border-gray-300 px-4 py-2"> 71 - 74 cm</td>
              <td className="border border-gray-300 px-4 py-2">75 - 80 cm </td>
              <td className="border border-gray-300 px-4 py-2">81 - 88 cm </td>
              <td className="border border-gray-300 px-4 py-2"> 89 - 96 cm</td>
              <td className="border border-gray-300 px-4 py-2">97 - 106 cm
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cadera</td>
              <td className="border border-gray-300 px-4 py-2">82 - 85 cm </td>
              <td className="border border-gray-300 px-4 py-2">86 - 91 cm </td>
              <td className="border border-gray-300 px-4 py-2"> 92 - 99 cm</td>
              <td className="border border-gray-300 px-4 py-2">100 - 107 cm</td>
              <td className="border border-gray-300 px-4 py-2">108 - 116 cm</td>
            </tr>
          </tbody>
        </table>

        <div class="flex items-start space-x-6 p-5 bg-[#ECEFF1]">
          {" "}
          {/* Flexbox para organizar la imagen y el texto */}
          <div class="w-1/2 flex-shrink-0 flex justify-center">
            {" "}
            {/* Ancho de la imagen (50% de la caja) */}
            <Image
              src="/comomedirHombre.png"
              alt="medir hombre"
              width={300}
              height={300}
            />
          </div>
          <div class="w-1/2  ">
            {" "}
            {/* Ancho del texto (50% de la caja) */}
            <Typography variant="body1" component="div">
              <p className="mb-[15px] mt-2">
                Sujetá la cinta métrica de forma horizontal para medir:
              </p>

              <p className="mb-[15px]">
                <strong>1. Pecho</strong>, alrededor de la parte más ancha
              </p>

              <p className="mb-[15px]">
                <strong>2. Cintura</strong>, alrededor de la parte más
                estrecha{" "}
              </p>

              <p className="mb-[15px]">
                {" "}
                <strong>3. Cadera</strong>, alrededor de la parte más ancha,
                manteniendo los pies juntos{" "}
              </p>

              <p className="mb-[15px]">
                {" "}
                Sujetá la cinta métrica de forma vertical para medir:{" "}
              </p>

              <p className="mb-[15px]">{" "}
                <strong>4. Tiro de la entrepierna</strong>, desde la
                entrepierna hasta el piso{" "}
              </p>

              <p className="mb-[15px]">
                {" "}
                <strong>5. Altura</strong>, desde la parte superior de la
                cabeza hasta el piso, manteniendo una postura recta{" "}
              </p>
            </Typography>
          </div>
        </div>
        </>
      ): (
        <>
        <h2 className="text-2xl font-bold mb-4">
          Talles de prendas superiores para mujer
        </h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Etiqueta del producto
              </th>
              <th className="border border-gray-300 px-4 py-2">XS</th>
              <th className="border border-gray-300 px-4 py-2">S</th>
              <th className="border border-gray-300 px-4 py-2">M</th>
              <th className="border border-gray-300 px-4 py-2">L</th>
              <th className="border border-gray-300 px-4 py-2">XL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Busto</td>
              <td className="border border-gray-300 px-4 py-2">78 - 81 cm</td>
              <td className="border border-gray-300 px-4 py-2">82 - 86 cm</td>
              <td className="border border-gray-300 px-4 py-2">87 - 92 cm</td>
              <td className="border border-gray-300 px-4 py-2">93 - 99 cm</td>
              <td className="border border-gray-300 px-4 py-2">100 - 108 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cintura</td>
              <td className="border border-gray-300 px-4 py-2">58 - 61 cm</td>
              <td className="border border-gray-300 px-4 py-2">62 - 66 cm</td>
              <td className="border border-gray-300 px-4 py-2">67 - 72 cm</td>
              <td className="border border-gray-300 px-4 py-2">73 - 79 cm</td>
              <td className="border border-gray-300 px-4 py-2">80 - 87 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cadera</td>
              <td className="border border-gray-300 px-4 py-2">83 - 86 cm</td>
              <td className="border border-gray-300 px-4 py-2">87 - 91 cm</td>
              <td className="border border-gray-300 px-4 py-2">92 - 96 cm</td>
              <td className="border border-gray-300 px-4 py-2">97 - 101 cm</td>
              <td className="border border-gray-300 px-4 py-2">102 - 110 cm</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mt-6">Talle Largo</h3>
        <p>
          Los talles largos están diseñados para mujeres de más de 175 cm.
        </p>
        <table className="table-auto w-full text-left border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Etiqueta del producto
              </th>
              <th className="border border-gray-300 px-4 py-2">S Largo</th>
              <th className="border border-gray-300 px-4 py-2">M Largo</th>
              <th className="border border-gray-300 px-4 py-2">L Largo</th>
              <th className="border border-gray-300 px-4 py-2">XL Largo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Busto</td>
              <td className="border border-gray-300 px-4 py-2">82 - 86 cm</td>
              <td className="border border-gray-300 px-4 py-2">87 - 91 cm</td>
              <td className="border border-gray-300 px-4 py-2">92 - 96 cm</td>
              <td className="border border-gray-300 px-4 py-2">97 - 101 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cintura</td>
              <td className="border border-gray-300 px-4 py-2">63 - 67 cm</td>
              <td className="border border-gray-300 px-4 py-2">68 - 72 cm</td>
              <td className="border border-gray-300 px-4 py-2">73 - 77 cm</td>
              <td className="border border-gray-300 px-4 py-2">78 - 82 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cadera</td>
              <td className="border border-gray-300 px-4 py-2">86 - 90 cm</td>
              <td className="border border-gray-300 px-4 py-2">91 - 95 cm</td>
              <td className="border border-gray-300 px-4 py-2">96 - 100 cm</td>
              <td className="border border-gray-300 px-4 py-2">101 - 105 cm</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mt-6">Talle Corto</h3>
        <p>
          Los talles petite/cortos están diseñados para mujeres de hasta 165 cm.
        </p>
        <table className="table-auto w-full text-left border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Etiqueta del producto
              </th>
              <th className="border border-gray-300 px-4 py-2">XS Corto</th>
              <th className="border border-gray-300 px-4 py-2">S Corto</th>
              <th className="border border-gray-300 px-4 py-2">M Corto</th>
              <th className="border border-gray-300 px-4 py-2">L Corto</th>
              <th className="border border-gray-300 px-4 py-2">XL Corto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Busto</td>
              <td className="border border-gray-300 px-4 py-2">75 - 78 cm</td>
              <td className="border border-gray-300 px-4 py-2">79 - 83 cm</td>
              <td className="border border-gray-300 px-4 py-2">84 - 89 cm</td>
              <td className="border border-gray-300 px-4 py-2">90 - 95 cm</td>
              <td className="border border-gray-300 px-4 py-2">96 - 104 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cintura</td>
              <td className="border border-gray-300 px-4 py-2">54 - 57 cm</td>
              <td className="border border-gray-300 px-4 py-2">58 - 62 cm</td>
              <td className="border border-gray-300 px-4 py-2">63 - 67 cm</td>
              <td className="border border-gray-300 px-4 py-2">68 - 72 cm</td>
              <td className="border border-gray-300 px-4 py-2">73 - 80 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cadera</td>
              <td className="border border-gray-300 px-4 py-2">78 - 81 cm</td>
              <td className="border border-gray-300 px-4 py-2">82 - 86 cm</td>
              <td className="border border-gray-300 px-4 py-2">87 - 92 cm</td>
              <td className="border border-gray-300 px-4 py-2">93 - 98 cm</td>
              <td className="border border-gray-300 px-4 py-2">99 - 105 cm</td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-start space-x-6 p-5 bg-[#ECEFF1]">
          {" "}
          {/* Flexbox para organizar la imagen y el texto */}
          <div class="w-1/2 flex-shrink-0 flex justify-center">
            {" "}
            {/* Ancho de la imagen (50% de la caja) */}
            <Image
              src="/comomedirMujer.png"
              alt="medir mujer"
              width={300}
              height={300}
            />
          </div>
          <div class="w-1/2  ">
            {" "}
            {/* Ancho del texto (50% de la caja) */}
            <Typography variant="body1" component="div">
              <p className="mb-[15px] mt-2">
                Sujetá la cinta métrica de forma horizontal para medir:
              </p>

              <p className="mb-[15px]">
                <strong>1. Pecho</strong>, alrededor de la parte más ancha
              </p>

              <p className="mb-[15px]">
                <strong>2. Cintura</strong>, alrededor de la parte más
                estrecha{" "}
              </p>

              <p className="mb-[15px]">
                {" "}
                <strong>3. Cadera</strong>, alrededor de la parte más ancha,
                manteniendo los pies juntos{" "}
              </p>

              <p className="mb-[15px]">
                {" "}
                Sujetá la cinta métrica de forma vertical para medir:{" "}
              </p>

              <p className="mb-[15px]">{" "}
                <strong>4. Tiro de la entrepierna</strong>, desde la
                entrepierna hasta el piso{" "}
              </p>

              <p className="mb-[15px]">
                {" "}
                <strong>5. Altura</strong>, desde la parte superior de la
                cabeza hasta el piso, manteniendo una postura recta{" "}
              </p>
            </Typography>
          </div>
        </div>
      </>
    )}
        
      </div>
    </div>
  </Box>
  )
}

export default PageTalles