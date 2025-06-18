import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  addToFavorites,
  deleteFavorites,
} from "../../pages/favorite/FavoritesSlice";
import { ProductType } from "../../types";


export const ToFavoriteButton = ({ product }:{product:ProductType}) => {
  const { favorites } = useAppSelector((state) => state.favorites);

  const dispatch = useAppDispatch();

  const onClickFavorites = () => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (favorites.some((el) => el.id === product.id)) {

      dispatch(deleteFavorites(product.id));
    } else {
 
      dispatch(addToFavorites(product));
    }
  };

  const isFavorite = favorites.some((item) => item.id === product.id);
  return (
    <div onClick={onClickFavorites}>
      {isFavorite ? (
        <HeartFilled style={{ fontSize: "35px", color: "#e00000",cursor: "pointer"}} />
      ) : (
        <HeartOutlined style={{ fontSize: "35px", color: "grey",cursor: "pointer"}} />
      )}

      {/* <FavoriteIcon active={isFavorite} /> */}
    </div>
  );
};
