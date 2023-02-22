import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

export interface UserState {
  profile: User | null;
}

const initialState: UserState = {
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        profile: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
