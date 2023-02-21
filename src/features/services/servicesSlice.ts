import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Service } from "./types";

export interface ServicesState {
  list: Service[];
}

const initialState: ServicesState = {
  list: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<Service>) => {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    updateService: (state, action: PayloadAction<Service>) => {
      const formIndex = state.list.findIndex(
        (form) => form.id === action.payload.id
      );
      const listCopy = [...state.list];
      listCopy[formIndex] = action.payload;
      return { ...state, list: listCopy };
    },
    deleteService: (state, action: PayloadAction<string>) => {
      const serviceIndex = state.list.findIndex(
        (service) => service.id === action.payload
      );
      const listCopy = [...state.list];
      listCopy.splice(serviceIndex, 1);
      return { ...state, list: listCopy };
    },
  },
});

export const selectServiceById = (state: RootState, serviceId: string) =>
  state.services.list.find((service) => service.id === serviceId);

export const { addService, updateService, deleteService } =
  servicesSlice.actions;

export default servicesSlice.reducer;
