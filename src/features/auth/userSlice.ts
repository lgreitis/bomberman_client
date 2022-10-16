import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface User {
  token: string;
  username: string;
}

const initialState: User = {
  token: localStorage.getItem("token") || "",
  username: localStorage.getItem("username") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      state.token = initialState.token;
      state.username = initialState.username;
      window.location.reload();
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
