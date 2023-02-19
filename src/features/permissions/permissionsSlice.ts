import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "./types";

export interface PermissionsState {
  users: User[];
}

const initialState: PermissionsState = {
  users: [],
};

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    addPermission: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    updatePermission: (state, action: PayloadAction<User>) => {
      const formIndex = state.users.findIndex(
        (form) => form.id === action.payload.id
      );
      const usersCopy = [...state.users];
      usersCopy[formIndex] = action.payload;
      return { ...state, users: usersCopy };
    },
    deletePermission: (state, action: PayloadAction<string>) => {
      const permissionIndex = state.users.findIndex(
        (permission) => permission.id === action.payload
      );
      const usersCopy = [...state.users];
      usersCopy.splice(permissionIndex, 1);
      return { ...state, users: usersCopy };
    },
  },
});

export const selectUserById = (state: RootState, userId: string) =>
  state.permissions.users.find((user) => user.id === userId);

export const { addPermission, updatePermission, deletePermission } = permissionsSlice.actions;

export default permissionsSlice.reducer;
