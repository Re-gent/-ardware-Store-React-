// @ts-nocheck
import { Link } from "react-router-dom";
import { ProductsCard } from "./Components/productsCard";
import { useSelector } from "react-redux";

export const FavoritePage = () => {
  const favorites = useSelector((state) => state.favorites.favorites); 

  console.log(favorites) 
  return (
    <div>
      <div className="cardBlock">
        {favorites.length ? (
          favorites.map((el) => (
            <ProductsCard key={el.id} product={el} addToFavotes={undefined} favoritesIds={undefined} />
          ))
        ) : (
          <h3>Товаров нет в избранном</h3>
        )}
      </div>

      <Link to="/">
        <div>Назад на главную</div>
      </Link>
    </div>
  );
};
