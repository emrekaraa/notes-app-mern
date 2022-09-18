import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  darkMode: boolean;
}

const initialState: CounterState = {
  darkMode: false,
};

export const siteConfigSlice = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setDarkMode } = siteConfigSlice.actions;
export default siteConfigSlice.reducer;
