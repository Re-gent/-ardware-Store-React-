import { Link } from "react-router-dom";
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { debounce } from "lodash";
import { Button, Input } from "antd";
import { useAppSelector } from "../../reduxHooks";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { Login } from "./Login";

type Props = {
  searchParams: URLSearchParams;
  handleOpenMenu: () => void;
  handleChangeFilters: (a: string, b: string) => void;
};

export const Header = ({
  handleChangeFilters,
  handleOpenMenu,
  searchParams,
}: Props) => {
  const debouncedHandler = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeFilters("q", e.target.value),
    700
  );

  const { cart } = useAppSelector((state) => state.cart);
  const { favorites } = useAppSelector((state) => state.favorites);

  const productCartQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const productFavoriteQuantity = favorites.length;

  const filters =
    searchParams.get("category") ||
    searchParams.get("price_gte") ||
    searchParams.get("price_lte");

  const [openModal, setOpenModal] = useState(false);
  const  closeModal =()=> {
     setOpenModal(false)
  }
  return (
    <div className="header">
      <Button
        size="large"
        type="text"
        onClick={() => setOpenModal(true)}
        icon={<UserOutlined style={{ fontSize: 30, color: "#ffff" }} />}
      />
      <h1 className="logo">PepeShop</h1>
      <div className="menuIconWrapper">
        {filters && <div className="circle" />}
        <div onClick={handleOpenMenu}>
          <MenuOutlined className="menuIcon" />
        </div>
      </div>
      <Input
        onChange={debouncedHandler}
        value={searchParams.get("q") || ""}
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
        ) : (
          ""
        )}
      </div>

      <Modal
        footer={null}
        onCancel={closeModal}
        open={openModal}
        destroyOnClose
      >
        <Login/>
      </Modal>
    </div>
  );
};
