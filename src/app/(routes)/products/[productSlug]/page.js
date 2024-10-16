
"use client";

import { useGetProductBySlug } from "@/app/api/getProductBySlug";
import { useParams, useRouter } from "next/navigation";
import SkeletonProduct from "./components/SkeletonProduct";
import CarouselProduct from "./components/CarouselProduct";
import InfoProduct from "./components/InfoProduct";
import Link from "next/link";
import ProductRelated from "./components/ProductRelated";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

function Page() {
  const params = useParams();
  const productSlug = params.productSlug;
  const router = useRouter();

  const { result } = useGetProductBySlug(productSlug);

  const [product, setProduct] = useState(null);
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [answerInput, setAnswerInput] = useState({});
  
  const { user } = useUser();

  useEffect(() => {
    // Verificar si el resultado contiene productos y establecer el estado de product
    if (result && result.length > 0) {
      setProduct(result[0]);
    }
  }, [result]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (product && product.id) {
        try {
          const response = await fetch(`/api/questions?productId=${product.id}`);
          const data = await response.json();
          setQuestionsList(data);
        } catch (error) {
          console.error("Error al obtener preguntas:", error);
        }
      }
    };

    fetchQuestions();
  }, [product]);

  
  
  
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    
    if (question.trim()) {
      try {
        await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionText: question,
            productId: product.id,
          }),
        });
        
        setQuestionsList([...questionsList, { question, answer: "" }]);
        setQuestion("");
      } catch (error) {
        console.error("Error al enviar la pregunta:", error);
      }
    }
  };
  
  const handleAnswerChange = (index, value) => {
    setAnswerInput({
      ...answerInput,
      [index]: value,
    });
  };
  
  const handleAnswerSubmit = async (index) => {
    const updatedQuestionsList = [...questionsList];
    const answer = answerInput[index];
    
    try {
      await fetch(`/api/questions/${updatedQuestionsList[index].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerText: answer,
        }),
      });
      
      updatedQuestionsList[index].answer = answer;
      updatedQuestionsList[index].isAnswered = true;
      setQuestionsList(updatedQuestionsList);
      setAnswerInput({ ...answerInput, [index]: "" });
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    }
  };

  const isVendor = user?.publicMetadata?.role === "seller";
  
  


  if (!product) {
    // Envolver el SkeletonProduct en el mismo contenedor y estructura que el InfoProduct
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <div className="grid sm:grid-cols-2">
          <div>
            <SkeletonProduct />
          </div>
          
        </div>
      </div>
    );
  }


  const category = product.attributes.category?.data?.attributes?.categoryName || 'Categoría no disponible';  
  const taste = product.attributes.taste || 'Género no disponible';
  const name = product.attributes.productName;
  const categorySlug = product.attributes.category?.data?.attributes?.slug;


  return (
    <div className="max-w-6xl mt-8 mx-auto sm:pb-32">
      <div className="flex items-center mb-11">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <button onClick={() => router.back()} className="block transition hover:text-blue-500">
              <span className="sr-only">Home</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </li>
          {['', taste, category, name].map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {item ? (
                index === 2 ? (
                  <Link href={`/category/${categorySlug}`} className="block transition hover:text-blue-500">
                    {category}
                  </Link>
                ) : (
                  <span className={`block transition ${index === 3 ? 'text-gray-400' : 'hover:text-gray-700'}`}>
                    {item}
                  </span>
                )
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid sm:grid-cols-2">
        <div>
          {product.attributes.images?.data?.length > 0 ? (
            <CarouselProduct images={product.attributes.images} />
          ) : (
            <p>No hay imágenes disponibles.</p>
          )}
        </div>
        <div className="sm:px-12 mb-20">
          <InfoProduct product={product} />
        </div>
      </div>

      <div>
        <ProductRelated currentProductSlug={productSlug} currentProductCategory={categorySlug} />
      </div>

      {/* Vendedor*/}
      <div className="max-w-6xl mt-8 mx-auto">
        <h3 className="text-xl font-semibold mb-4">Preguntas al vendedor</h3>

        <form onSubmit={handleQuestionSubmit} className="mb-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Haz una pregunta al vendedor"
            rows="4"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Enviar pregunta
          </button>
        </form>

        {questionsList.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Preguntas anteriores</h4>
            <ul className="list-disc ml-6">
              {questionsList.map((item, index) => (
                <li key={index} className="mb-4">
                  <div>
                    <strong>Pregunta:</strong> {item.question}
                  </div>

                  {item.answer ? (
                    <div className="text-green-600">
                      <strong>Respuesta del vendedor:</strong> {item.answer}
                    </div>
                  ) : (
                    isVendor && (
                      <div>
                        <textarea
                          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                          placeholder="Escribe una respuesta"
                          rows="2"
                          value={answerInput[index] || ""}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                        <button
                          onClick={() => handleAnswerSubmit(index)}
                          className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                        >
                          Enviar respuesta
                        </button>
                      </div>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;




