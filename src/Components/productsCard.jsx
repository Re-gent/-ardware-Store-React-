import { Link } from "react-router-dom";
import { ToFavoriteButton } from "./toFavoriteButton";
import { ToCartButton } from "./toCartButton";

export const ProductsCard = ({
  product,
  CartIds,
}) => {
  /* диструкторизация */
  const { img, name, brand, rating, price, id } = product;
// изменение цвета иконки в соответствии с выбором
  const color = CartIds && CartIds.includes(id) ? "#449231" : "grey";
  return (
    <div className="prodactCard">
      <div className="CardPicture">
      <Link to={`/product/${id}`}>
        <img width={160} src={img} alt="фото тавара" />
        </Link>
      </div>
      <div className="cardContent">
      <Link to={`/product/${id}`}>
        <div>
          <div>{name}</div>
          <h3>{brand}</h3>
          <div>рейтинг:{rating}</div>
          <h3>${price}</h3>
        </div>
        </Link>

        <div>
       {/*  отрисовка значка избранных товаров */}
          <ToFavoriteButton product={product} />
           {/* отрисовка значка корзины товаров */}
           <ToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
