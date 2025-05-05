import { Link } from "react-router-dom";
import { ProductsCard } from "../src/Components/productCard";

export const FavoritePage = ({ favoriteProducts }) => {
  return (
    <div>
      <div className="cardBlock">
        {favoriteProducts.length ? (
          favoriteProducts.map((el) => 
            // @ts-ignore
            <ProductsCard key={el.id} product={el} />

          )
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
