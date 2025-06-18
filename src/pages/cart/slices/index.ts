import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../types";
import { AppDispatch } from "../../../store";
// REDUX слайсер. Здесь собраны все запросы с сервера для товаров в карзине

export const loadCart = createAsyncThunk<ProductType[]>(
  "products/loadCart",
  async (params, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/cart`);
    const result = await response.json();
    return result;
  }
);

export const addToCart = createAsyncThunk<
  void, //ничего не возвращает
  ProductType,
  { dispatch: AppDispatch }
>("products/addToCart", async (produt, { dispatch }) => {
  await fetch(`http://localhost:5000/cart`, {
    method: "POST", // или 'PUT'
    body: JSON.stringify(produt), // данные могут быть 'строкой' или {объектом}!
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(loadCart());
});

export const updateProductCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>("products/updateProductCart", async (updatedProduct, { dispatch }) => {
  await fetch(`http://localhost:5000/cart/${updatedProduct.id}`, {
    method: "PUT", // или 'PUT'
    body: JSON.stringify(updatedProduct), // данные могут быть 'строкой' или {объектом}!
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(loadCart());
});

export const deleteCart = createAsyncThunk<
  void, //ничего не возвращает
  number,
  { dispatch: AppDispatch }
>("products/deleteCart", async (id, { dispatch }) => {
  await fetch(`http://localhost:5000/cart/${id}`, {
    method: "DELETE", // или 'PUT'
  });

  dispatch(loadCart());
});

type InitialStateCart = {
  cart: ProductType[];
};

const initialState: InitialStateCart = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    /* addPost: (state,action) => {
      //wg
    }, */
  },
  extraReducers: (builder) => {
    /* builder.addCase(fetchFavorites.pending, (state, action) => {
      console.log("запрос пошел, данных нет");
    }); */
    builder.addCase(loadCart.fulfilled, (state, action) => {
      /* данные приходят с сервера */
      state.cart = action.payload;
    });
    builder.addCase(loadCart.rejected, (state, action) => {
      console.log("запрос упал с ошибкой");
    });
  },
});

export default cartSlice.reducer;
