import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "products/fetchFavorites",
  async (params, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/favorites`);
    const result = await response.json();

    return result;
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
      const dataFromServer = action.payload;
      state.favorites = dataFromServer;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      console.log("запрос упал с ошибкой");
    });
  },
});

export default favoritesSlice.reducer;
