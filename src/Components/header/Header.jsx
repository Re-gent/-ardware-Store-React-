// @ts-nocheck
import { Link } from "react-router-dom";
import { FavoriteIcon } from "../FavoriteIcon";
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { debounce } from "lodash";
import { Input } from "antd";
import { useSelector } from "react-redux";

export const Header = ({
  handleChangeFilters,
  handleOpenMenu,
  searchParams,
}) => {
  const debouncedHandler = debounce(
    (e) => handleChangeFilters("q", e.target.value),
    700
  );

  const { cart } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorites);

  const productCartQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const productFavoriteQuantity = favorites.length

  const filters =
    searchParams.get("category") ||
    searchParams.get("price_gte") ||
    searchParams.get("price_lte");

  return (
    <div className="header">
      <h1 className="logo">PepeShop</h1>
      <div className="menuIconWrapper">
        {filters && <div className="circle" />}
        <div onClick={handleOpenMenu}>
          <MenuOutlined className="menuIcon" />
        </div>
      </div>
      <Input
        onChange={debouncedHandler}
        defaultValue={searchParams.get("q") || ""}
      />
      <div className="headerIcons">
        <Link className="link" to="/cart">
          <ShoppingOutlined style={{ fontSize: "40px", color: "#ffff" }} />
        </Link>
        {!!productCartQuantity && (
          <div className="iconQuantity">{productCartQuantity}</div>
        )}

        <Link className="link" to="/favorite">
          <div className="favoriteMenu">
            <HeartOutlined style={{ fontSize: "40px", color: "#ffff" }} />
          </div>
        </Link>
        {/* !! -- приведение к bool(булевому) значению */}
        {productFavoriteQuantity ? (
          <div className="iconQuantity">{productFavoriteQuantity}</div>
        ): ''}
      </div>
    </div>
  );
};
