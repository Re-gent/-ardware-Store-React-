import "./sort.scss";
// сортировка товаров по цене
export const Sort = ({ handleChangeFilters, searchParams }) => {
  return (
    <div className="sort">
      <span>Сортировка по цене:</span>
      <span
        onClick={() => handleChangeFilters("_order","asc")}
        className={searchParams.get("_order") === "asc" ? "sortActive" : ""}
      >
        По возрастанию
      </span>
      <span
        onClick={() => handleChangeFilters("_order","desc")}
        className={searchParams.get("_order") === "desc" ? "sortActive" : ""}
      >
        По убыванию
      </span>
    </div>
  );
};
