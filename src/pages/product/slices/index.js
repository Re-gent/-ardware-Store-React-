// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// REDUX слайсер. Здесь собраны все запросы с сервера для избранных товаров
export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const result = await response.json();

    return result;
  }
);


const initialState = {
  product: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    /* addPost: (state,action) => {
			//wg
		}, */
  },
  extraReducers: (builder) => {
 
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      /* данные приходят с сервера */
      state.product = action.payload;
    });
    builder.addCase(loadProduct.rejected, (state, action) => {
      console.log("запрос упал с ошибкой");
    });
  },
});

export default productSlice.reducer;
