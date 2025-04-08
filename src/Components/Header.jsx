import { Link } from "react-router-dom";
import { FavoriteIcon } from "./FavoriteIcon";

export const Header = ({ handInput, handleOpenMenu }) => {
  return (
    <div className="header">
      <div>
        <img
          width={60}
          src="https://play-lh.googleusercontent.com/6hwIJLyur1myTggmf6Xzvt28Zyepgv_5zDzZQ_YBKPVHpeS8U5I1T9WNDPpUGHdnsw"
          alt="здесь фото"
        />
      </div>
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
      <Link to="/favorite">
        <div className="favoriteMenu">
          <FavoriteIcon active={false} />
        </div>
      </Link>
    </div>
  );
};
