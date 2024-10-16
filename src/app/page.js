import GlobalApi from "./api/GlobalApi";
import BannerDiscount from "./components/BannerDiscount";
import BannerProduct from "./components/BannerProduct";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";
import BrandList from "./components/BrandList";
import CategoryList from "./components/CategoryList";
import FeaturesSection from "./components/FeaturesSection";
import ChatBotButton from "./components/ChatBotButton";
import ScrollButton from "./components/ScrollButton";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  const productList = await GlobalApi.getAllProducts();

  const brandList = await GlobalApi.getBrand();

  const categoryList = await GlobalApi.getCategoryList();

  return (
    <>
      <div>
        <Slider sliderList={sliderList} />
      </div>

      {/* Productos destacados*/}
      <div className=" bg-[#f1f1f1] dark:bg-[#19191A]">
        <div className="md:px-52 py-8">
          <ProductList productList={productList} />
        </div>
      </div>
      <div className="md:px-16">
        <BannerDiscount />

        {/* <Categorias /> */}
        <CategoryList categoryList={categoryList} />
      </div>
      <div>
        <BannerProduct />
      </div>
      {/* navegar por marcas */}
      <div className="md:px-16">
        <BrandList brandList={brandList} />
      </div>
      {/* Feature section */}
      <FeaturesSection />



    <ScrollButton />


      {/* ChatBot*/}
        <ChatBotButton />
      
    </>
  );
}
