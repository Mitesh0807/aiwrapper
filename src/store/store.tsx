import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";
import apiSlice from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    api: apiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
