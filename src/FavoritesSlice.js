import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "products/fetchFavorites",
  async (userId, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/favorites`);
    const result = await response.json();

    return result;
  }
);

const initialState = {
  /* favoritesLoading: false,
  favoriteError: "", */
  favorites: []
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
      state.favoritesLoading = true;
      console.log("запрос пошел, данных нет");
    }); */
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
     /*  state.favoritesLoading = false; */
      /* данные приходят с сервера */
      const dataFromServer = action.payload;
      state.favorites = dataFromServer;
    });
    /* builder.addCase(fetchFavorites.rejected, (state, action) => {
      console.log("запрос упал с ошибкой");
      state.favoriteError = "error";
    }); */
  },
});

export const { addPost } = favoritesSlice.actions;
export default favoritesSlice.reducer;
