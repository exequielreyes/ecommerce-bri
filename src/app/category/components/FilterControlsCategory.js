
import FilterOrigin from "./FilterOrigin";

//lo nuevo agregado
import FilterPrice from "./FilterPrice";
import FilterColor from "./FilterColor";
import FilterGender from "./FilterGender";
// import FilterCategory from "./FilterCategory";



function FiltersControlsCategory({ filterOrigin, setFilterOrigin , setFilterPrice, selectedColors, setSelectedColors, selectedGender, setSelectedGender }) {
  return (
    <div className="sm:w-[350px] sm:mt-5 ">
      <FilterGender selectedGender={selectedGender} setSelectedGender={setSelectedGender} /> {/* Nuevo filtro de género */}
      <FilterOrigin filterOrigin={filterOrigin} setFilterOrigin={setFilterOrigin} />
      <FilterPrice setFilterPrice={setFilterPrice} />
      <FilterColor selectedColors={selectedColors} setSelectedColors={setSelectedColors} /> 
    </div>
  );
}

export default FiltersControlsCategory;
