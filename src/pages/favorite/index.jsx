// @ts-nocheck
import { Link } from "react-router-dom";
import { ProductsCard } from "../../Components/productCard";
import { useSelector } from "react-redux";
import { LinkBack } from "../../Components/LinkBack";

export const FavoritePage = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

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
