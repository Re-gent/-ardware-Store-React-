import "./sort.css";

export const Sort = ({ handleChangeSort, sort }) => {
  return (
    <div className="sort">
      <span>Сортировка по цене:</span>
      <span
        onClick={() => handleChangeSort("asc")}
        className={sort === "asc" ? "sortActive" : ""}
      >
        По возрастанию
      </span>
      <span
        onClick={() => handleChangeSort("desc")}
        className={sort === "desc" ? "sortActive" : ""}
      >
        По убыванию
      </span>
    </div>
  );
};
