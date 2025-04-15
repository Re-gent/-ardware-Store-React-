import { Header } from "./Components/Header";
import { NavBar } from "./Components/NavBar";
import { ProductsCard } from "./Components/productsCard";

export const Main = ({
  openNavbar,
  handleOpenMenu,
  handInput,
  handleChangeCategory,
  selectedCategory,
  products,
  onClickFavorites,
  favoritesIds,
  loading,
}) => {
  return (
    <>
      <Header handInput={handInput} handleOpenMenu={handleOpenMenu} />
      {openNavbar && (
        <NavBar
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
        />
      )}
      {loading && <h1>Loading...</h1>}
      <div className="cardBlock">
        {products.map((el) => (
          <ProductsCard
            key={el.id}
            onClickFavorites={onClickFavorites}
            favoritesIds={favoritesIds}
            product={el}
          />
        ))}
      </div>
    </>
  );
};
