/* eslint-disable @next/next/no-img-element */
// import { useMemo, useRef, useState } from 'react'
// import { createAutocomplete } from '@algolia/autocomplete-core'
// import Link from 'next/link'

// const AutocompleteItem = ({ id, title, image, price }) => {
//   return (
//     <li>
//       <Link href={`/products/${id}`} className='hover:bg-blue-300 flex gap-4 p-4'>
//   <img src={image} alt={title} className='w-12 h-12 object-contain' />
//   <div>
//     <h3 className='text-sm font-semibold'>{title}</h3>
//     <p className='text-xs text-gray-600'>{price}</p>
//   </div>
// </Link>

//     </li>
//   )
// }

// export default function Search (props) {
//   const [autocompleteState, setAutocompleteState] = useState({
//     collections: [],
//     isOpen: false
//   })

//   const autocomplete = useMemo(
//     () =>
//       createAutocomplete({
//         placeholder: 'Busca tu producto',
//         onStateChange: ({ state }) => setAutocompleteState(state),
//         getSources: () => [
//           {
//             sourceId: 'offers-next-api',
//             getItems: ({ query }) => {
//               if (!!query) {
//                 return fetch(`/api/search?q=${query}`)
//                   .then((res) => res.json())
//                   .catch((error) => {
//                     console.error('Error fetching data:', error);
//                     return [];
//                   });
//               }
//             },
//           },
//         ],
//         ...props,
//       }),
//     [props]
//   );

//   const formRef = useRef(null)
//   const inputRef = useRef(null)
//   const panelRef = useRef(null)

//   const formProps = autocomplete.getFormProps({
//     inputElement: inputRef.current
//   })
//   const inputProps = autocomplete.getInputProps({
//     inputElement: inputRef.current
//   })

//   return (
//     <form ref={formRef} className="flex justify-center w-1/2" {...formProps}>
//     <div className="flex relative p-1 bg-gradient-to-tr from-purple-600 to-blue-300 rounded-full 6">
//       <input ref={inputRef} className=' md:w-96 flex-1 p-2 px-4 rounded-full w-full' {...inputProps} />
//       {autocompleteState.isOpen && (
//         <div
//           className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10"
//           ref={panelRef}
//           {...autocomplete.getPanelProps()}
//         >
//           {autocompleteState.collections.map((collection, index) => {
//             const { items } = collection;
//             return (
//               <section key={`section-${index}`}>
//                 {items.length > 0 && (
//                   <ul {...autocomplete.getListProps()}>
//                     {items.map((item) => (
//                       <AutocompleteItem key={item.id} {...item} />
//                     ))}
//                   </ul>
//                 )}
//               </section>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   </form>
//   )
// }

"use client";

import { useMemo, useRef, useState, useEffect } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AutocompleteItem = ({ id, title, image, price, closePanel }) => {
  return (
    <li onClick={closePanel}>
      <Link href={`/products/${id}`} className='hover:bg-blue-300 flex gap-4 p-4'>
        <img src={image} alt={title} className='w-12 h-12 object-contain' />
        <div>
          <h3 className='text-sm font-semibold'>{title}</h3>
          <p className='text-xs text-gray-600'>{price}</p>
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
            sourceId: 'offers-next-api',
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
      router.push(`/search-results?q=${query}`);
      closePanel(); // Cierra el panel al enviar el formulario
    },
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={containerRef} className="flex justify-center w-full md:w-1/2" {...formProps}>
      <div className="flex relative p-1 bg-gradient-to-tr from-purple-600 to-blue-300 rounded-full w-full">
        <input
          ref={inputRef}
          className="w-full md:w-96 flex-1 p-2 px-4 rounded-full"
          {...inputProps}
        />
        <button
          type="submit"
          className="p-2 rounded-full text-white"
          onClick={closePanel} // Cierra el panel al hacer clic en el botón
        >
          <FaSearch size={18} />
        </button>
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10 w-full md:w-96"
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

