import FilterCategory from "../../components/FilterCategory";
function FilterControlCategory({  selectedCategories, setSelectedCategories }) {
  return (
    <div className="sm:w-[350px] ">
      <FilterCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /> {/* Nuevo filtro de categorías */}
    </div>
  );
}

export default FilterControlCategory;
