import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./pages/favorite/FavoritesSlice";
import productsReducer from "./pages/main/productsSlice";
import cartReducer from "./pages/cart/slices";
import productReducer from "./pages/product/slices";
import userReducer from "./Components/header/Login/slices";
import { brandsApi } from "./querys/brandsApi";
import { commentsApi } from "./querys/commentsApi";
// Общий хаб для всех слайсеров и их редьюсеров(экшенов) проекта. Служит для удобного прокидывания функций и т.п. в любые файлы проекта.
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    //RTK Query API
    [brandsApi.reducerPath]: brandsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brandsApi.middleware, commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
