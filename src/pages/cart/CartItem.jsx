import { useDispatch } from "react-redux";
import "./index.css";
import { deleteCart, updateProductCart } from "./slices";
import { DeleteOutlined } from "@ant-design/icons";
// страница корзины товаров 
export const CartItem = ({ product }) => {
  const { name, brand, price, img, rating, id, quantity } = product;
  const dispatch = useDispatch();
  //функции для изменения количества товаров(меняет состояние в базе данных)
  const handleChangePlusQuantity = () => {
    // @ts-ignore
    dispatch(updateProductCart({ ...product, quantity: quantity + 1 }));
  };
  const handleChangeMinusQuantity = () => {
    if (quantity > 1) {
      // @ts-ignore
      dispatch(updateProductCart({ ...product, quantity: quantity - 1 }));
    }
  };

  return (
    <div>
      <div className="cartItemBlock">
        <img width={100} src={img} alt="фото тавара" />
        <div className="cartItemTitle">
          <h3>{brand}</h3>
          <div>{name}</div>
        </div>
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
// @ts-ignore
          deleteCart(id))} />
        </div>
      </div>
    </div>
  );
};
