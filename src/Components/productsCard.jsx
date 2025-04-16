import { ShoppingOutlined } from "@ant-design/icons";
import { FavoriteIcon } from "./FavoriteIcon";

export const ProductsCard = ({
  product,
  onClickFavorites,
  favoritesIds,
  onClickCart,
  CartIds,
}) => {
  /* диструкторизация */
  const { img, name, brand, rating, price, id } = product;
// изменение цвета иконки в соответствии с выбором
  const color = CartIds && CartIds.includes(id) ? "#449231" : "grey";
  return (
    <div className="prodactCard">
      <div className="CardPicture">
        <img width={160} src={img} alt="фото тавара" />
      </div>
      <div className="cardContent">
        <div>
          <div>{name}</div>
          <h3>{brand}</h3>
          <div>рейтинг:{rating}</div>
          <h3>${price}</h3>
        </div>

        <div>
        // отрисовка значка избранных товаров
          {favoritesIds && (
            <div
              className="iconFavorite"
              onClick={() => onClickFavorites(product)}
            >
              <FavoriteIcon active={favoritesIds.includes(id)} />
            </div>
          )}
          // отрисовка значка корзины товаров
          {CartIds && (
            <div className="iconCart" onClick={() => onClickCart(product)}>
              <ShoppingOutlined
                style={{ fontSize: "35px", color: color, cursor: "pointer" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
