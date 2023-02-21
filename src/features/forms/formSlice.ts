import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FormType } from "./types";

export type FormSubmitData = {
  id: string;
  formId: string;
  created_date: string;
  updated_date: string;
  [key: string]: string | string[] | boolean | number;
};

export interface FormsState {
  list: FormType[];
  submittedForms: FormSubmitData[];
}

const initialState: FormsState = {
  list: [],
  submittedForms: [],
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
    submitForm: (state, action: PayloadAction<FormSubmitData>) => {
      return {
        ...state,
        submittedForms: [...state.submittedForms, action.payload],
      };
    },
    updateSubmittedForm: (state, action: PayloadAction<FormSubmitData>) => {
      const formIndex = state.submittedForms.findIndex(
        (form) => form.id === action.payload.id
      );
      const submittedFormsCopy = [...state.submittedForms];
      submittedFormsCopy[formIndex] = action.payload;
      return { ...state, submittedForms: submittedFormsCopy };
    },
    deleteSubmittedForm: (state, action: PayloadAction<string>) => {
      const formIndex = state.submittedForms.findIndex(
        (form) => form.id === action.payload
      );
      const submittedFormsCopy = [...state.submittedForms];
      submittedFormsCopy.splice(formIndex, 1);
      return { ...state, submittedForms: submittedFormsCopy };
    },
  },
});

export const selectFormById = (state: RootState, formId: string) =>
  state.forms.list.find((form) => form.id === formId);

export const selectFormsSubmittedById = (state: RootState, formId: string) =>
  state.forms.submittedForms.filter((form) => form.formId === formId);

export const selectSubmittedFormById = (state: RootState, formId: string) =>
  state.forms.submittedForms.find((form) => form.id === formId);

export const {
  addForm,
  updateForm,
  deleteForm,
  submitForm,
  updateSubmittedForm,
  deleteSubmittedForm,
} = formsSlice.actions;

export default formsSlice.reducer;
