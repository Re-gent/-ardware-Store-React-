// @ts-nocheck
import { Link } from "react-router-dom";
import { LinkBack } from "../../Components/LinkBack";
import { useSelector } from "react-redux";
import { CartItem } from "./CartItem";
import "./index.css";

export const CartPage = ({ onClickFavorites }) => {
  const { cart } = useSelector((state) => state.cart);

  // подсчет итоговой цены на странице карзины товаров
  let totalPrice = cart.reduce(
      // acc -- аккумулятор, который хранит в себе мат. действия, совершенные над параметрами товаров в корзине товаров 
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  let productCount = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );;
  console.log(cart);
  return (
    <div>
      <div className="">
        {cart.length ? (
          cart.map((el) => (
            <CartItem
              key={el.id}
              product={el}
              onClickFavorites={onClickFavorites}
            />
          ))
        ) : (
          <h3>Товаров нет в корзине</h3>
        )}
      </div>
      <div className="totalPriceBlock">
        <div className="totalPriceRow">
          <div>Количество шт:</div>&nbsp;&nbsp; // отступ в обход CSS
          <b>{productCount}</b>
        </div>
        <div className="totalPriceRow">
          <h3>Итого:</h3>
          <h3 className="totalPrice">${totalPrice}</h3>
        </div>
      </div>
      <LinkBack />
    </div>
  );
};
