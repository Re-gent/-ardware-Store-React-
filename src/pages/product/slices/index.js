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

export const loadComments = createAsyncThunk(
  "products/loadComment",
  async (id,thunkAPI) => {
    const result = await fetch(`http://localhost:5000/comments?productID=${id}`);
    const data = await result.json();
    return data
  }
);

export const createComment = createAsyncThunk(
  "products/createComment",
  async (comment, { dispatch }) => {
    await fetch(`http://localhost:5000/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(loadComments(comment.productID));
  }
);

const initialState = {
  product: null,
  comments: [],
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

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },


});

export default productSlice.reducer;
