export const ProductsCard = ({img,name,rating,price,brand}) => {
  return (
    <div>
        <div className="prodactCard">
          <div className="CardPicture">
          <img width={160}  src={img} alt="фото тавара" />
          </div>
          <div>{name}</div>
          <h3>{brand}</h3>
          <div>рейтинг:{rating}</div>
          <h3>${price}</h3>
        </div>
    </div>
  );
};
