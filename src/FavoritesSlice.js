// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "products/fetchFavorites",
  async (params, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/favorites`);
    const result = await response.json();

    return result;
  }
);

export const addToFavorites = createAsyncThunk(
  "products/addToFavorites",
  async (produt, thunkAPI) => {
    await fetch(`http://localhost:5000/favorites`, {
      method: "POST", // или 'PUT'
      body: JSON.stringify(produt), // данные могут быть 'строкой' или {объектом}!
      headers: {
        "Content-Type": "application/json",
      },
    })
    thunkAPI.dispatch(fetchFavorites())
  }
);

export const deleteFavorites = createAsyncThunk(
  "products/addFavorites",
  async (id, thunkAPI) => {
    await fetch(`http://localhost:5000/favorites/${id}`, {
      method: "DELETE", // или 'PUT'
    })

    thunkAPI.dispatch(fetchFavorites())
  }
);

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
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
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      /* данные приходят с сервера */
      state.favorites = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      console.log("запрос упал с ошибкой");
    });
  },
});

export default favoritesSlice.reducer;
