import { Link } from "react-router-dom";
import { FavoriteIcon } from "../FavoriteIcon";
import { ShoppingOutlined } from "@ant-design/icons";
import "./index.scss"

export const Header = ({ handInput, handleOpenMenu }) => {
  return (
    <div className="header">
      <h1>
        PereShop
      </h1>
      <div onClick={handleOpenMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="60"
          height="60"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fff"
            d="M6 22H42V26H6zM6 10H42V14H6zM6 34H42V38H6z"
          ></path>
        </svg>
      </div>
      <input onChange={(e) => handInput(e.target.value)} />
      <Link to="/cart">
      <ShoppingOutlined style={{ fontSize: "40px", color: "#ffff" }} />
      </Link>
      
      <Link to="/favorite">
        <div className="favoriteMenu">
          <FavoriteIcon active={false} />
        </div>
      </Link>
    </div>
  );
};
