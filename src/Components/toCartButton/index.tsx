import { ShoppingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { addToCart, deleteCart } from "../../pages/cart/slices";
import { ProductType } from "../../types";

export const ToCartButton = ({ product }:{product:ProductType}) => {
  const cart = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  const onClickCart = () => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (cart.some((el) => el.id === product.id)) {

      dispatch(deleteCart(product.id));
    } else {

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
