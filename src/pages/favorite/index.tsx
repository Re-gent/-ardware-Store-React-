import { ProductsCard } from "../../Components/productCard";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { LinkBack } from "../../Components/LinkBack";
import { useEffect } from "react";
import { fetchFavorites } from "./FavoritesSlice";

export const FavoritePage = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  useEffect(() => {
    dispatch(fetchFavorites());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(favorites);
  return (
    <div>
      <div className="cardBlock">
        {favorites.length ? (
          favorites.map((el) => <ProductsCard key={el.id} product={el} />)
        ) : (
          <h3>Товаров нет в избранном</h3>
        )}
      </div>
      <LinkBack />
    </div>
  );
};
