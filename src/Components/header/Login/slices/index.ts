import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../../store";

type UserType = {
  name: string;
  login: string;
  phone?: string;
  password?: string;
  id?: string;
};

const getUsers = async (): Promise<UserType[]> => {
  const usersResult = await fetch(`http://localhost:5000/users`);
  return await usersResult.json();
};

export const login = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { message: string } }
>("user/login", async (userForm, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const checkUserLogin = users.find(
    (user) =>
      user.login === userForm.login && user.password === userForm.password
  );

  /* const checkUserPassword = users.some(
    (user) =>
      user.login !== userForm.login || user.password !== userForm.password
  ); */

  if (checkUserLogin) {
    return checkUserLogin;
  } else {
    return rejectWithValue({ message: "неверный логин или пароль" });
  }
});

export const registration = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { message: string } }
>("user/registartion", async (userForm, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const checkUser = users.some(
    (user) => user.login === userForm.login || user.phone === userForm.phone
  );
  if (checkUser) {
    return rejectWithValue({ message: "пользователь уже зарегистрирован" });
  }
  
    const result = await fetch(`http://localhost:5000/users`, {
      method: "POST",
      body: JSON.stringify(userForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await result.json();
  
});

type InitialStateCart = {
  user: UserType | null;
  error: null | string;
};

const initialState: InitialStateCart = {
  user: null,
  error: null,
};

const registartionSlice = createSlice({
  name: "userSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });

    builder.addCase(registration.rejected, (state, action) => {
       state.error = action.payload? action.payload.message : null
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      //условие проверки на ошибку можно убрать, так в этом случае оно не сильно важно. Правильнее чекать ошибку по статусу
      // if (action.payload?.message === "неверный логин или пароль") 
        state.error = action.payload? action.payload.message : null
      
    });
  },
  reducers: {},
});

export default registartionSlice.reducer;
