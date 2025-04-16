
import { useState } from "react";
import { Header } from "../../Components/Header";
import { NavBar } from "../../Components/NavBar";
import { ProductsCard } from "../../Components/productsCard";
import { useDispatch, useSelector } from "react-redux";
import { Sort } from "../../Components/Sort/Sort";
import { addToCart, deleteCart } from "../cart/slices";

export const Main = ({
  onClickFavorites,
  handInput,
  handleChangeCategory,
  selectedCategory,
  handleChangeSort,
  sort,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);

  // @ts-ignore
  const favorites = useSelector((state) => state.favorites.favorites);
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);
  // @ts-ignore
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };

  

  const onClickCart = (product) => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (cart.some((el) => el.id === product.id)) {
      // @ts-ignore
      dispatch(deleteCart(product.id));
    } else {
      // @ts-ignore
      dispatch(addToCart(product));
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
            onClickCart={onClickCart}
            favoritesIds={favorites.map((i) => i.id)}
            CartIds={cart.map((i) => i.id)}
            product={el}
          />
        ))}
      </div>
    </>
  );
};
