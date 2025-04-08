import { FavoriteIcon } from "./FavoriteIcon";

export const ProductsCard = ({ product, addToFavotes, favoritesIds }) => {
  /* диструкторизация */
  const { img, name, brand, rating, price, id } = product;
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

       {favoritesIds && (<div className="iconFavorite" onClick={() => addToFavotes(product)}>
          <FavoriteIcon active={favoritesIds.includes(id)} />
        </div>)}
      </div>
    </div>
  );
};
