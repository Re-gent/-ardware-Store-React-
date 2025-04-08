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
  addToFavotes,
  favoritesIds,
  loading,
}) => {
  return (
    <>
      <Header handInput={handInput} handleOpenMenu={handleOpenMenu} />
      {loading && <h1>Loading...</h1>}
      {openNavbar && (
        <NavBar
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
        />
      )}
      <div className="cardBlock">
        {products.map((el) => (
          <ProductsCard
            key={el.id}
            addToFavotes={addToFavotes}
            favoritesIds={favoritesIds}
            product={el}
          />
        ))}
      </div>
    </>
  );
};
