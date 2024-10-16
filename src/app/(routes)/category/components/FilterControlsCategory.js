
// import FilterCategory from "./FilterCategory";
import FilterGender from "./FilterGender";
import FilterOrigin from "./FilterOrigin";
import FilterPrice from "./FilterPrice";
import FilterColor from "./FilterColor";
import { usePathname } from "next/navigation";


function FiltersControlsCategory({ filterOrigin = [], setFilterOrigin , setFilterPrice, selectedColors, setSelectedColors, selectedGender, setSelectedGender, uniqueBrands }) {
  const pathname = usePathname();
  const isBrandCategory = pathname.startsWith('/brand-category/');
  const isFilterControlCategory = pathname === '/filterControlsCategory';
  return (
    <div className={`sm:w-[350px] ${!isFilterControlCategory ? '' : 'sm:mt-5'}  `}>
      {/* <FilterCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /> Nuevo filtro de categorías */}
      <FilterGender selectedGender={selectedGender} setSelectedGender={setSelectedGender} /> {/* Nuevo filtro de género */}
       
       {/* Mostrar FilterOrigin solo si no estás en la página de brand-category */}
       { !isBrandCategory && (
        <FilterOrigin 
          filterOrigin={filterOrigin} 
          setFilterOrigin={setFilterOrigin} 
          uniqueBrands={uniqueBrands} 
        />
      )}
      <FilterPrice setFilterPrice={setFilterPrice} />
      <FilterColor selectedColors={selectedColors} setSelectedColors={setSelectedColors} /> 
    </div>
  );
}

export default FiltersControlsCategory;
