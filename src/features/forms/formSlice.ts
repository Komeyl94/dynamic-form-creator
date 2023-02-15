import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Form } from "./types";

export interface FormsState {
  list: Form[];
}

const initialState: FormsState = {
  list: [],
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Form>) => {
      const newForms = [...state.list, action.payload];
      return { ...state, list: newForms };
    },
    // getForm: (state, action: PayloadAction<number>) => {
    //   return state.forms.find((form) => form.id === action.payload);
    // }
  },
});

export default formsSlice.reducer;