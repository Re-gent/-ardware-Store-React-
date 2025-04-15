// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    /* запрос к серверу _like -- нестрогое равенство
	?q=....&-- квери-запросы*/
    /* поиск по категориям в меню и через поиск через  Back-end*/
    const { selectedCategory, inputName, sort } = params;
    
    const sortQuery = sort ? `&_sort=price&_order=${sort}` : "";

    const response = await fetch(
      `http://localhost:5000/products?q=${inputName}&category_like=${selectedCategory}${sortQuery}`
    );
    const result = await response.json();
    return result;
  }
);

const initialState = {
  loading: false,
  products: [],
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      /* данные приходят с сервера */
      const dataFromServer = action.payload;
      state.products = dataFromServer;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("запрос упал с ошибкой");
    });
  },
});

export default productsSlice.reducer;
