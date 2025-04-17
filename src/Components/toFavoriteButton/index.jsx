import { ShoppingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  deleteFavorites,
} from "../../pages/favorite/FavoritesSlice";
import { FavoriteIcon } from "../FavoriteIcon";

export const ToFavoriteButton = ({ product }) => {
  // @ts-ignore
  const { favorites } = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  const onClickFavorites = () => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (favorites.some((el) => el.id === product.id)) {
      // @ts-ignore
      dispatch(deleteFavorites(product.id));
    } else {
      // @ts-ignore
      dispatch(addToFavorites(product));
    }
  };

  const isFavorite = favorites.some((item) => item.id === product.id);
  return (
    <div onClick={onClickFavorites}>
      <FavoriteIcon active={isFavorite} />
    </div>
  );
};
