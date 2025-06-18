import { useParams } from "react-router-dom";
import { loadProduct } from "./slices";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect } from "react";
import "./index.scss";
import { ToCartButton } from "../../Components/toCartButton";
import { ToFavoriteButton } from "../../Components/toFavoriteButton";
import { ProductComments } from "./comments";
import { useGetProductQuery } from "../../querys/brandsApi";

export const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  //const { product } = useAppSelector((state) => state.product);
  
  
  // в данном случае скипается (skip) запрос на продукт с id с которым он уже делался. То есть id запоминается (кешируется) и повторные запросы на бэк не делаюся 
  const { data: product } = useGetProductQuery(id!, { skip: !id });
  /* useEffect(() => {
    if (id) {
      dispatch(loadProduct(id));
    }
  }, []); */

  if (!product) {
    return <div>Loading...</div>;
  }

  const { img, name, brand, rating, price, description } = product;

  return (
    <>
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
            <ToFavoriteButton product={product} />
            <ToCartButton product={product} />
          </div>
        </div>
      </div>

      <ProductComments productID={product.id} />
    </>
  );
};
