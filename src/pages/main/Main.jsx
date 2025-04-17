
import { useState } from "react";
import { Header } from "../../Components/Header";
import { NavBar } from "../../Components/NavBar";
import { ProductsCard } from "../../Components/productsCard";
import { useDispatch, useSelector } from "react-redux";
import { Sort } from "../../Components/Sort/Sort";


export const Main = ({

  handInput,
  handleChangeCategory,
  selectedCategory,
  handleChangeSort,
  sort,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <>
      <Header handInput={handInput} handleOpenMenu={handleOpenMenu} />
      {openNavbar && (
        <NavBar
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
        />
      )}

      <Sort sort={sort} handleChangeSort={handleChangeSort} />

      {loading && <h1>Loading...</h1>}
      <div className="cardBlock">
        {products.map((el) => (
          // @ts-ignore
          <ProductsCard
            key={el.id}
            product={el}
          />
        ))}
      </div>
    </>
  );
};
