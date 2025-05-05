import { ShoppingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart } from "../../pages/cart/slices";

export const ToCartButton = ({ product }) => {
  // @ts-ignore
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const onClickCart = () => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (cart.some((el) => el.id === product.id)) {
      // @ts-ignore
      dispatch(deleteCart(product.id));
    } else {
      // @ts-ignore
      dispatch(addToCart(product));
    }
  };

  const color = cart.some((item) => item.id === product.id)
    ? "#449231"
    : "grey";

  return (
    <ShoppingOutlined
      onClick={onClickCart}
      style={{ fontSize: "35px", color: color, cursor: "pointer" }}
    />
  );
};
