import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FormType } from "./types";

export interface FormsState {
  list: FormType[];
}

const initialState: FormsState = {
  list: [],
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormType>) => {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    updateForm: (state, action: PayloadAction<FormType>) => {
      const formIndex = state.list.findIndex(
        (form) => form.id === action.payload.id
      );
      const listCopy = [...state.list];
      listCopy[formIndex] = action.payload;
      return { ...state, list: listCopy };
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      const formIndex = state.list.findIndex(
        (form) => form.id === action.payload
      );
      const listCopy = [...state.list];
      listCopy.splice(formIndex, 1);
      return { ...state, list: listCopy };
    },
  },
});

export const selectFormById = (state: RootState, formId: string) =>
  state.forms.list.find((form) => form.id === formId);

export const { addForm, updateForm, deleteForm } = formsSlice.actions;

export default formsSlice.reducer;
