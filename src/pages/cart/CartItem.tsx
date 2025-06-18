import { useAppDispatch } from "../../reduxHooks";
import { ProductType } from "../../types";
import "./index.scss";
import { deleteCart, updateProductCart } from "./slices";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


// страница корзины товаров 

export const CartItem = ({ product }:{product: ProductType}) => {
  const { name, brand, price, img, id, quantity } = product;
  const dispatch = useAppDispatch();
  //функции для изменения количества товаров(меняет состояние в базе данных)
  const handleChangePlusQuantity = () => {
    dispatch(updateProductCart({ ...product, quantity: quantity + 1 }));
  };
  const handleChangeMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(updateProductCart({ ...product, quantity: quantity - 1 }));
    }
  };

  return (
    <div>
      <div className="cartItemBlock">
      <Link className="link" to={`/product/${id}`}>
        <img width={100} src={img} alt="фото тавара" />
        </Link>
        <Link className="link" to={`/product/${id}`}>
        <div className="cartItemTitle">
          <h3>{brand}</h3>
          <div>{name}</div>
        </div>
        </Link>
        <div className="cartItemPriceWrapper">
          <div className="cartItemQuantity">
            <button onClick={handleChangeMinusQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={handleChangePlusQuantity}>+</button>
          </div>
          <h3 className="cartItemPrice">${price * quantity}</h3>
        </div>
        <div className="cartDeleteItem">
          <DeleteOutlined onClick={()=>dispatch(
          deleteCart(id))} />
        </div>
      </div>
    </div>
  );
};
