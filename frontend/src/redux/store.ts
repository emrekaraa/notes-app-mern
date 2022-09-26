import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import siteCongifReducer from "./siteConfigSlice";
import notesReducer from "./notesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    siteConfig: siteCongifReducer,
    notes: notesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
