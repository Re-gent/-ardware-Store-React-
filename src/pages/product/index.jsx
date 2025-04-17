import { useParams } from "react-router-dom";
import { loadProduct } from "./slices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.scss";
import { ToCartButton } from "../../Components/toCartButton";
import { ToFavoriteButton } from "../../Components/toFavoriteButton";

export const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // @ts-ignore
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    // @ts-ignore
    dispatch(loadProduct(id));
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { img, name, brand, rating, price,description } = product;

  return (
    <div className="productPageBlock">
      <img width={400} src={img} alt="фото тавара" />
      <div className="productInfo">
        <div>
          <div>{name}</div>
          <h3>{brand}</h3>
          <div>рейтинг:{rating}</div>
          <h3>${price}</h3>
          <p>{description}</p>
        </div>

        <div className="productPageIcons">
          <ToFavoriteButton product={product}/>
					<ToCartButton product={product}/>
        </div>
      </div>
    </div>
  );
};
