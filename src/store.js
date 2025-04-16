import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./pages/favorite/FavoritesSlice";
import productsReducer from "./pages/main/productsSlice";
import cartReducer from "./pages/cart/slices";
// Общий хаб для всех слайсеров и их редьюсеров(экшенов) проекта. Служит для удобного прокидывания функций и т.п. в любые файлы проекта.
export const store = configureStore({
  reducer: { favorites: favoritesReducer, products: productsReducer, cart: cartReducer },
});
