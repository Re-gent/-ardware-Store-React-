import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../types";
// REDUX слайсер. Здесь собраны все запросы с сервера для избранных товаров

export const loadProduct = createAsyncThunk<ProductType, string>(
  "products/loadProduct",
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const result = await response.json();

    return result;
  }
);

/* type CommentType = {
  userName: string;
  text: string;
  productID: number;
  date: string;
  // id?: number - необязателный параметр (опциональное поле)
  id?: number;
}; */
/* export const loadComments = createAsyncThunk<CommentType[], number>(
  "products/loadComment",
  async (id, thunkAPI) => {
    const result = await fetch(
      `http://localhost:5000/comments?productID=${id}`
    );
    const data = await result.json();
    return data;
  }
); */

export const createProduct = createAsyncThunk<void,ProductType>(
  "products/createProduct",
  async (product, { dispatch }) => {
    await fetch(`http://localhost:5000/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

  }
);

/* export const createComment = createAsyncThunk<void,CommentType>(
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
); */

type InitialStateType ={
  product: ProductType | null
  //comments: CommentType[]
}

const initialState:InitialStateType = {
  product: null,
  //comments: [],
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

    /* builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    }); */
  },
});

export default productSlice.reducer;
