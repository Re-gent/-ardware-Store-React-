import { Link } from "react-router-dom";
import { ToFavoriteButton } from "../toFavoriteButton";
import { ToCartButton } from "../toCartButton";
import "./index.scss";
import { memo } from "react";

// @ts-ignore
export const ProductsCard = memo(({ product }) => {
  /* диструкторизация */
  const { img, name, brand, rating, price, id } = product;

  return (
    <div className="prodactCard">
      <div className="CardPicture">
        <Link className="link" to={`/product/${id}`}>
          <img width={160} src={img} alt="фото тавара" />
        </Link>
      </div>
      <div className="cardContent">
        <Link className="link" to={`/product/${id}`}>
          <div>
            <div>{name}</div>
            <h3>{brand}</h3>
            <div>рейтинг:{rating}</div>
            <h3>${price}</h3>
          </div>
        </Link>

        <div className="iconsMainBlock">
          {/*  отрисовка значка избранных товаров */}
          <ToFavoriteButton product={product} />
          {/* отрисовка значка корзины товаров */}
          <ToCartButton product={product} />
        </div>
      </div>
    </div>
  );
});
