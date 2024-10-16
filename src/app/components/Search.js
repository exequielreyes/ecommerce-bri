/* eslint-disable @next/next/no-img-element */

"use client";

import { useMemo, useRef, useState, useEffect } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { formatPrice } from '../../../lib/formatPrice';

const AutocompleteItem = ({title,slug, images, price, discount, closePanel }) => {
  const discountAmount = price * (discount / 100);
  const finalPrice = price - discountAmount;

  return (
    <li onClick={closePanel}>
      <Link href={`/products/${slug}`} className='hover:bg-blue-300 flex gap-4 p-4'>
        <img src={images ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images}` : '/default-image.jpg'} alt={title} className='w-12 h-12 object-contain' />
        <div>
          <h3 className='text-sm font-semibold'>{title}</h3>
         {/* Mostramos el precio original tachado y el precio con descuento */}
         {discount ? (
            <div className='flex items-center gap-2'>
              <p className='text-xs text-gray-400 line-through'>{formatPrice(price)}</p>
              <p className='text-xs text-red-600 font-semibold'>{formatPrice(finalPrice)}</p>
            </div>
          ) : (
            // Si no hay descuento, mostramos solo el precio normal
            <p className='text-xs text-gray-600'>{formatPrice(price)}</p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const router = useRouter();

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Busca tu producto',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'products-strapi-api',
            getItems: ({ query }) => {
              if (query) {
                return fetch(`/api/search?q=${query}`)
                  .then((res) => res.json())
                  .catch((error) => {
                    console.error('Error fetching data:', error);
                    return [];
                  });
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const containerRef = useRef(null);

  const closePanel = () => {
    setAutocompleteState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      closePanel();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
    onSubmit(event) {
      event.preventDefault();
      const query = inputRef.current.value;
      router.push(`/category/search-results?q=${query}`);
      closePanel(); // Cierra el panel al enviar el formulario
    },
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={containerRef} className="flex justify-center w-auto" {...formProps}>
      <div className="flex relative p-1 md:w-[25rem] max-w-full bg-gradient-to-tr from-gray-500 to-gray-400 rounded-full w-full ">
        <input
          ref={inputRef}
          className="w-full  flex-1 p-1 px-3  rounded-full outline-none"
          {...inputProps}
        />
        <button
          type="submit"
          className="p-2 rounded-full "
          onClick={closePanel} // Cierra el panel al hacer clic en el botón
        >
          <FaSearch size={18} />
        </button>
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white  dark:text-black overflow-hidden rounded-lg shadow-lg z-10 w-full"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem
                          key={item.id}
                          {...item}
                          closePanel={closePanel} // Pasar la función para cerrar el panel
                        />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}

