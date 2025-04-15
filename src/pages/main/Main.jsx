// @ts-nocheck
import { useState } from "react";
import { Header } from "../../Components/Header";
import { NavBar } from "../../Components/NavBar";
import { ProductsCard } from "../../Components/productsCard";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, deleteFavorites } from "../favorite/FavoritesSlice";
import { Sort } from "../../Components/Sort/Sort";

export const Main = ({
  handInput,
  handleChangeCategory,
  selectedCategory,
  handleChangeSort,
  sort,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);

  const favorites = useSelector((state) => state.favorites.favorites);
  const { products, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };

  const onClickFavorites = (product) => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (favorites.some((el) => el.id === product.id)) {
      dispatch(deleteFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
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
          <ProductsCard
            key={el.id}
            onClickFavorites={onClickFavorites}
            favoritesIds={favorites.map((i) => i.id)}
            product={el}
          />
        ))}
      </div>
    </>
  );
};
